const Appointment = require("../models/Appointment");
const { emitAppointmentUpdate } = require("../websockets/socketManager");
const { sendEmail } = require("../services/emailService");
const { getCache, setCache } = require("../services/cacheService");
const moment = require("moment");

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date, timeSlot } = req.body;
    const appointment = new Appointment({
      doctorId,
      patientId,
      date,
      timeSlot,
      status: "pending",
    });
    const savedAppointment = await appointment.save();

    // Populate the doctor and patient details
    const populatedAppointment = await Appointment.findById(
      savedAppointment._id
    )
      .populate("doctorId", "name specialization")
      .populate("patientId", "name email role");

    await sendEmail(
      populatedAppointment.patientId.email,
      "Appointment Reminder",
      `Reminder: You have an appointment on ${moment(
        populatedAppointment.date
      ).format("YYYY-MM-DD")} at ${populatedAppointment.timeSlot}.`,
      3 // Adding retries parameter
    );

    res.status(201).json(populatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    
    const cachedAppointments = await getCache("appointments_list");
    if (cachedAppointments) return res.status(200).json(cachedAppointments);

    const appointments = await Appointment.find()
      .populate("doctorId", "name specialization")
      .populate("patientId", "name email role");

    await setCache("appointments_list", appointments, 300);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    emitAppointmentUpdate(appointment.patientId.toString(), appointment);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { bookAppointment, getAppointments, updateAppointmentStatus };
