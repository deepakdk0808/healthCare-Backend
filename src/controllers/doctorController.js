const Doctor = require("../models/Doctor");
const {
  getCache,
  setCache,
  invalidateDoctorCache,
} = require("../services/cacheService");

const getDoctors = async (req, res) => {
  try {
    const cachedDoctors = await getCache("doctors_list");
    if (cachedDoctors) return res.status(200).json(cachedDoctors);

    const doctors = await Doctor.find().populate("patientId", "name email");
    await setCache("doctors_list", doctors, 300);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addDoctor = async (req, res) => {
  try {
    const { specialization, availability, patientId } = req.body;

    // Create a new doctor record
    const newDoctor = new Doctor({
      specialization,
      availability,
      patientId,
    });

    // Save the new doctor to the database
    const savedDoctor = await newDoctor.save();

    // Populate the patient details
    const populatedDoctor = await Doctor.findById(savedDoctor._id).populate(
      "patientId",
      "name email role"
    );

    // Update the cache
    const doctors = await Doctor.find().populate(
      "patientId",
      "name email role"
    );
    await setCache("doctors_list", doctors, 300);

    res.status(201).json(populatedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDoctors, addDoctor };
