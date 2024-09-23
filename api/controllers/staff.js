import squareClient from "../utils/square-client.js";
import jsonBigInt from "json-bigint";
import asyncHandler from "express-async-handler";

const locationId = process.env["SQ_LOCATION_ID"];

const get_staff = asyncHandler(async (req, res, next) => {
  const serviceId = req.params.serviceId;
  const serviceVersion = req.query.version;
  // const currPrice = req.query.currPrice;

  try {
    // Send request to get the service associated with the given item variation ID, and related objects.
    const retrieveServicePromise =
      squareClient.catalogApi.retrieveCatalogObject(serviceId, true);

    // Send request to list staff booking profiles for the current location.
    const listBookingProfilesPromise =
      squareClient.bookingsApi.listTeamMemberBookingProfiles(
        true,
        undefined,
        undefined,
        locationId
      );
    // Send request to list all active team members for this merchant at this location.
    const listActiveTeamMembersPromise = squareClient.teamApi.searchTeamMembers(
      {
        query: {
          filter: {
            locationIds: [locationId],
            status: "ACTIVE",
          },
        },
      }
    );

    // Wait until all API calls have completed.
    const [
      { result: services },
      {
        result: { teamMemberBookingProfiles },
      },
      {
        result: { teamMembers },
      },
    ] = await Promise.all([
      retrieveServicePromise,
      listBookingProfilesPromise,
      listActiveTeamMembersPromise,
    ]);

    // We want to filter teamMemberBookingProfiles by checking that the teamMemberId associated with the profile is in our serviceTeamMembers.
    // We also want to verify that each team member is ACTIVE.
    const serviceVariation = services.object;
    const serviceItem = services.relatedObjects.filter(
      (relatedObject) => relatedObject.type === "ITEM"
    )[0];

    const serviceTeamMembers =
      serviceVariation.itemVariationData.teamMemberIds || [];
    const activeTeamMembers = teamMembers.map((teamMember) => teamMember.id);

    const bookableStaff = teamMemberBookingProfiles.filter(
      (profile) =>
        serviceTeamMembers.includes(profile.teamMemberId) &&
        activeTeamMembers.includes(profile.teamMemberId)
    );

    res.json({
      bookableStaff: jsonBigInt.stringify(bookableStaff),
      // serviceItem: serviceItem,
      //currPrice: jsonBigInt.stringify(currPrice),
      serviceVariation: jsonBigInt.stringify(serviceVariation),
      serviceVersion: jsonBigInt.stringify(serviceVersion),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default { get_staff };
