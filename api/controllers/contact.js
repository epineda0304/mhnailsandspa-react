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

/**
 * GET /contact
 *
 * Render the contact information form prior to creating a booking
 *
 *  accepted query params are:
 * `serviceId` - the ID of the service
 * `staffId` - the ID of the staff
 * `startAt` - starting time of the booking
 * `version` - the version of the service initially selected
 */
const send_To_Contact = asyncHandler(async (req, res, next) => {
  const serviceId = req.params.serviceId;
  // const addOns = req.query.addOns;
  // const currPrice = req.query.currPrice;
  const serviceVersion = req.query.version;
  const staffId = req.params.staffId;
  const startAt = req.query.startAt;

  try {
    // Send request to get the service associated with the given item variation ID, and related objects.
    const retrieveServicePromise =
      squareClient.catalogApi.retrieveCatalogObject(serviceId, true);

    // Send request to get the team member profile of the staff selected
    const retrieveTeamMemberPromise =
      squareClient.bookingsApi.retrieveTeamMemberBookingProfile(staffId);

    const [
      {
        result: { object: serviceVariation, relatedObjects },
      },
      {
        result: { teamMemberBookingProfile },
      },
    ] = await Promise.all([retrieveServicePromise, retrieveTeamMemberPromise]);
    const serviceItem = relatedObjects.filter(
      (relatedObject) => relatedObject.type === "ITEM"
    )[0];

    res.json({
      serviceItem: jsonBigInt.stringify(serviceItem),
      serviceVariation: jsonBigInt.stringify(serviceVariation),
      serviceVersion: jsonBigInt.stringify(serviceVersion),
      startAt: jsonBigInt.stringify(startAt),
      // addOns: jsonBigInt.stringify(addOns),
      // currPrice: jsonBigInt.stringify(currPrice),
      teamMemberBookingProfile: jsonBigInt.stringify(teamMemberBookingProfile),
    });
  } catch (error) {
    // res.status(404).render("pages/404");
    // console.error(error);
    next(error);
  }
});

export default { send_To_Contact };
