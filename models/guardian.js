const mongoose = require('mongoose');
const Joi = require('joi');
const JoiOid = require('joi-oid');

const guardianSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:50,
        trim:true
    },
    phone:{
        type:Number,
        minlength:10,
        maxlength:10
    }
});

const Guardian = mongoose.model('Guardian',guardianSchema);

function validateGuardian(guardian){
    const schema = Joi.object({
        name:Joi.string().min(5).max(50),
        phone:Joi.number().min(10).max(10)
    });

    return schema.validate({
        name:guardian.name,
        phone:guardian.phone
    });
}

exports.Guardian = Guardian;
exports.validateGuardian = validateGuardian;
exports.guardianSchema = guardianSchema;