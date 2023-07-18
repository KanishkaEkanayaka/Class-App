const mongoose = require('mongoose');
const Joi = require('joi');
const JoiOid = require('joi-oid');
const {fileSchema,File} = require('./file');

const tuteSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:30,
        trim:true
    },
    file:{
        type: mongoose.Schema.Types.ObjectId, // If we give invalid author id, mongoose not going to give error. just save it as a reference to author document.
        ref: 'File',
        required:true
    },
    grade:{
        type:String,
        required:true,
        enum:["eight","nine","ten","eleven","administratives"],
        lowercase:true,
        trim: true
    },
    month:{
        type:Date,
        required:true,
        default:Date.now
    }
});

const Tute = mongoose.model('Tute',tuteSchema);

const grades = ["eight","nine","ten","eleven","administratives"];

function validateTute(tute){
    const schema = Joi.object({
        name:Joi.string().min(5).max(30).required(),
        fileId:JoiOid().required(),
        grade:Joi.string().valid(...grades).required(),
        month: Joi.date().required()
    });

    return schema.validate({
        name:tute.name,
        fileId:tute.fileId,
        grade:tute.grade,
        month:tute.month
    });
}

exports.Tute = Tute;
exports.validateTute = validateTute;