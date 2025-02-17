const express = require("express");
const router = express.Router();
const { getPatientProfile } = require("../controllers/patientController");

router.get("/profile/:id", getPatientProfile);

module.exports = router;
