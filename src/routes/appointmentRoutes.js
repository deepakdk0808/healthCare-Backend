const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");

router.post("/book", bookAppointment);
router.get("/list", getAppointments);
router.put("/update/:id", updateAppointmentStatus);

module.exports = router;
