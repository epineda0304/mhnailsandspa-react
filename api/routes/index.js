import express from "express";
import AvailabilityRoute from "../controllers/availability.js";
import BookingsRoute from "../controllers/booking.js";
import ContactRoute from "../controllers/contact.js";
import ServicesRoute from "../controllers/services.js";
import StaffRoute from "../controllers/staff.js";

const router = express.Router();

router.get(
  "/availability/:staffId/:serviceId",
  AvailabilityRoute.get_Availability
);
router.post("/booking/create", BookingsRoute.create_booking);
router.get("/contact/:staffId/:serviceId", ContactRoute.send_To_Contact);
router.get("/services/:type", ServicesRoute.get_services);
router.get("/staff/:serviceId", StaffRoute.get_staff);

export default router;
