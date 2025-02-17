HealthCare is a healthcare management system that allows users to manage appointments, doctors, patients, and authentication. The system also includes caching and email notification functionalities.

package.json
src/
    .env
    config/
        db.js
        redis.js
    controllers/
        appointmentController.js
        authController.js
        doctorController.js
        patientController.js
    index.js
    models/
        Appointment.js
        Doctor.js
        User.js
    routes/
        appointmentRoutes.js
        authRoutes.js
        doctorRoutes.js
        patientRoutes.js
    scheduled_tasks/
        cronJobs.js
    services/
        cacheService.js
        emailService.js
    websockets/
        socketManager.js

PORT=5000
MONGO_URI='provide your own mongo uri'
REDIS_HOST='127.0.0.1'
REDIS_PORT=6379
EMAIL_PASS="provide your own email password"
EMAIL_USER="provide your own email"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


Usage
API Endpoints
Authentication

POST /api/auth/register - Register a new user
POST /api/auth/login - Login a user
Appointments

POST /api/appointments/book - Book an appointment
GET /api/appointments/list - Get a list of appointments
PUT /api/appointments/update/:id - Update appointment status

Doctors

GET /api/doctors/list - Get a list of doctors
POST /api/doctors/add - Add a new doctor
Patients

GET /api/patients/profile/:id - Get patient profile

Scheduled Tasks
Cron Jobs
Deletes appointments older than 2 minutes and clears the cache every minute. Implemented in cronJobs.js.
WebSockets
Socket Manager
Initializes WebSocket connections and handles appointment updates. Implemented in socketManager.js.
