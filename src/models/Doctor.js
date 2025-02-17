const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
patientId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
specialization:{type:String,required:true},
availability:[{day:String,slots:[String]}],
createdAt:{type:Date,default:Date.now},

})

module.exports = mongoose.model('Doctor',DoctorSchema);