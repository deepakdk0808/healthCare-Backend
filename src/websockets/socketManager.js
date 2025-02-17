const socketIo=require('socket.io');

let io;

const initializeSocket=(server)=>{
    io=socketIo(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    })

    io.on('connection',(socket)=>{
      console.log("New Client connected:", socket.id);

      //handle appointment status
      socket.on("subscriberToAppointment", (userId) => {
        socket.join(`appointment_${userId}`);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    })

   
}

const emitAppointmentUpdate=(userId,appointment)=>{
    console.log("emitting appointment update",appointment);
    io.on(`appointment_${userId}`).emit('appointmentUpdate',appointment);
}

module.exports={initializeSocket,emitAppointmentUpdate}