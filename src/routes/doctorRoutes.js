const express = require("express");
const router = express.Router();
// const {authenticate} = require('../controllers/authController');
const { getDoctors, addDoctor } = require("../controllers/doctorController");

router.get("/list", getDoctors);
router.post("/add", addDoctor);

module.exports = router;
