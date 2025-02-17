const cron=require('node-cron');
const {getCache,deleteCache}=require('../services/cacheService');
const Appointment=require('../models/Appointment');
const moment=require('moment');


//delete the appointment at regular that are older than 2 minutes

cron.schedule("* * * * *",async()=>{
   try{
    const twoMinutes=moment().subtract(2,'minutes').toDate();
    const result=await Appointment.deleteMany({createdAt:{$lt:twoMinutes}});
    console.log(`${result.deletedCount} appointments deleted`);

    // cache 

    const cachedAppointments=await getCache('appointments');
    if(cachedAppointments){
        await deleteCache('appointments_list');
        console.log("appointments_list cache deleted");
    }
   } 
    catch(err){
         console.log(err);
    }
})