/*
Copyright 2021 Square Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import squareClient from "../utils/square-client.js";
import jsonBigInt from "json-bigint";
import asyncHandler from "express-async-handler";
import crypto from "crypto";

const locationId = process.env["SQ_LOCATION_ID"];

const _allAddOns = new Map([
  ["Shape", { price: 5, fixed: true }],
  ["Lengths", { price: 10, fixed: false }],
  ["Designs", { price: 10, fixed: false }],
  ["Soak off", { price: 10, fixed: true }],
  ["Gel", { price: 15, fixed: true }],
  ["French", { price: 10, fixed: true }],
  ["Chrome", { price: 15, fixed: true }],
  ["LED", { price: 20, fixed: true }],
  ["Brightening Mask", { price: 20, fixed: true }],
  ["Vitamin C Mask", { price: 20, fixed: true }],
]);

function handleSellersNote(addOns) {
  let sellerNote = "";
  let additionalCosts = 0;

  if (addOns.length > 0) {
    sellerNote = "Add-ons: ";

    for (let i = 0; i < addOns.length; i++) {
      let addOn = _allAddOns.get(addOns[i]);
      additionalCosts += addOn.price;
      sellerNote +=
        i == addOns.length - 1 ? `${addOns[i]}\n` : `${addOns[i]}, `;
    }
  }

  return { note: sellerNote, costs: additionalCosts };
}

const create_booking = asyncHandler(async (req, res, next) => {
  const serviceId = req.query.serviceId;
  const serviceVariationVersion = req.query.version;
  const addOns = req.query.addOns;
  const staffId = req.query.staffId;
  const startAt = req.query.startAt;

  const customerNote = req.body.customerNote;
  const emailAddress = req.body.email;
  const familyName = req.body.lastName;
  const givenName = req.body.firstName;
  const phoneNumber = req.body.phone;

  const sellersInfo = handleSellersNote(JSON.parse(addOns));
  let sellerNote =
    sellersInfo.note +
    `Minimum additional costs for add-ons: $${sellersInfo.costs}`;

  try {
    // Retrieve catalog object by the variation ID
    const {
      result: { object: catalogItemVariation },
    } = await squareClient.catalogApi.retrieveCatalogObject(serviceId);
    const durationMinutes = convertMsToMins(
      catalogItemVariation.itemVariationData.serviceDuration
    );

    // Create booking
    const {
      result: { booking },
    } = await squareClient.bookingsApi.createBooking({
      booking: {
        appointmentSegments: [
          {
            durationMinutes,
            serviceVariationId: serviceId,
            serviceVariationVersion,
            teamMemberId: staffId,
          },
        ],
        customerId: await getCustomerID(
          givenName,
          familyName,
          emailAddress,
          phoneNumber
        ),
        customerNote,
        sellerNote,
        locationId,
        startAt,
      },
      idempotencyKey: crypto.randomUUID(),
    });

    const bookingId = booking.id;

    try {
      // Retrieve the booking provided by the bookingId.
      const {
        result: { booking },
      } = await squareClient.bookingsApi.retrieveBooking(bookingId);

      const serviceVariationId =
        booking.appointmentSegments[0].serviceVariationId;
      const teamMemberId = booking.appointmentSegments[0].teamMemberId;

      // Make API call to get service variation details
      const retrieveServiceVariationPromise =
        squareClient.catalogApi.retrieveCatalogObject(serviceVariationId, true);

      // Make API call to get team member details
      const retrieveTeamMemberPromise =
        squareClient.bookingsApi.retrieveTeamMemberBookingProfile(teamMemberId);

      // Wait until all API calls have completed
      const [
        { result: service },
        {
          result: { teamMemberBookingProfile },
        },
      ] = await Promise.all([
        retrieveServiceVariationPromise,
        retrieveTeamMemberPromise,
      ]);

      const serviceVariation = service.object;
      const serviceItem = service.relatedObjects.filter(
        (relatedObject) => relatedObject.type === "ITEM"
      )[0];

      const discountRes = await squareClient.catalogApi.searchCatalogObjects({
        objectTypes: ["DISCOUNT"],
      });

      const discounts = discountRes.result.objects;

      const originalPrice = formatMoney(
        serviceItem.itemData.variations[0].itemVariationData.priceMoney.amount
      );

      let currPrice = parseInt(originalPrice.substring(1));

      for (let i = 0; i < discounts.length; i++) {
        if (serviceItem.itemData.name === discounts[i].discountData.name) {
          const discountedPrice = formatMoney(
            discounts[i].discountData.amountMoney.amount
          );

          let origPriceInt = parseInt(originalPrice.substring(1), 10);
          let discountedPriceInt = parseInt(discountedPrice.substring(1), 10);

          currPrice = origPriceInt - discountedPriceInt;
        }
      }

      res.json({
        booking: jsonBigInt.stringify(booking),
        serviceItem: jsonBigInt.stringify(serviceItem),
        // serviceVariation: jsonBigInt.stringify(serviceVariation),
        teamMemberBookingProfile: jsonBigInt.stringify(
          teamMemberBookingProfile
        ),
        totalPrice: jsonBigInt.stringify(
          currPrice + parseInt(sellersInfo.costs)
        ),
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

function formatMoney(value, currency = "USD") {
  let valueAsNumber = Number(value);
  // Create number formatter.
  const props = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  };
  // If the value is an integer, show no decimal digits.
  if (valueAsNumber % 1 == 0) {
    props.minimumFractionDigits = 0;
  }

  // Some currencies don't need to use higher denominations to represent values.
  if (currency !== "JPY") {
    valueAsNumber /= 100.0;
  }
  const formatter = new Intl.NumberFormat("en-US", props);

  return formatter.format(valueAsNumber);
}

/**
 * Convert a duration in milliseconds to minutes
 *
 * @param {*} duration - duration in milliseconds
 * @returns {Number} - duration in minutes
 */
function convertMsToMins(duration) {
  return Math.round(Number(duration) / 1000 / 60);
}

/**
 * Return the id of a customer that matches the firstName, lastName and email
 * If such customer doesn't exist, create a new customer.
 *
 * @param {string} givenName
 * @param {string} familyName
 * @param {string} emailAddress
 */
async function getCustomerID(givenName, familyName, emailAddress, phoneNumber) {
  const {
    result: { customers },
  } = await squareClient.customersApi.searchCustomers({
    query: {
      filter: {
        emailAddress: {
          exact: emailAddress,
        },
      },
    },
  });

  if (customers && customers.length > 0) {
    const matchingCustomers = customers.filter(
      (customer) =>
        customer.givenName === givenName && customer.familyName === familyName
    );

    // If a matching customer is found, return the first matching customer
    if (matchingCustomers.length > 0) {
      return matchingCustomers[0].id;
    }
  }

  // If no matching customer is found, create a new customer and return its ID
  const {
    result: { customer },
  } = await squareClient.customersApi.createCustomer({
    emailAddress,
    familyName,
    givenName,
    idempotencyKey: crypto.randomUUID(),
    phoneNumber,
    referenceId: "MH-NAILS-AND-SPA",
  });

  return customer.id;
}

export default { create_booking };
