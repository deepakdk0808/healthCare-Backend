const User = require("../models/User");
const {
  getCache,
  setCache,
  invalidatePatientCache,
} = require("../services/cacheService");

const getPatientProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const cachedProfile = await getCache(`patient_profile_${id}`);
    if (cachedProfile) return res.status(200).json(cachedProfile);
    const patient = await User.findById(id);
    console.log(patient);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    await setCache(`patient_profile_${id}`, patient, 300);
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPatientProfile };
