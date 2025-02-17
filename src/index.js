const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const http=require('http');
const { initializeSocket } = require("./websockets/socketManager");

dotenv.config()

const app=express();
app.use(express.json());
app.use(cors());


connectDB();

app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));


const PORT=process.env.PORT || 5000;
const server=http.createServer(app);
initializeSocket(server);

server.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});