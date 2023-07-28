const mongoose = require('mongoose');
const Joi = require('joi');
const JoiOid = require('joi-oid');

const classSchema = new mongoose.Schema({
    className:{
        type:String,
        maxlength:250,
        required:true,
    },
    grade:{
        type:String,
        required:true,
        enum:["eight","nine","ten","eleven","administratives"],
        lowercase:true,
        trim: true
    },
    classLink:{
        type:String,
        maxlength:500,
        required:true
    },
    classTime:{
        type:Date,
        required:true,
        default:Date.now
    },
    lesson:{
        type:String,
        required:true,
        maxlength:50
    },
    classStatus:{
        type:String,
        required:true,
        enum:['upcoming','ongoing','completed','canceled'],
        lowercase:true,
        trim:true,
        default:'upcoming'
    }
});

const Class = mongoose.model('Class',classSchema);

//change class status to active if the scheduled time is correct.
classSchema.static('beginClass',async function(){
    const today = new Date();
    await this.updateMany({'classTime':today},{$set:{classStatus:'ongoing'}});
});

//function to end the class
classSchema.methods.endClass = function(){
    this.classStatus = 'completed';
}

//function to cancel the class
classSchema.methods.cancelClass = function(){
    this.classStatus = 'canceled';
}

const grades = ["eight","nine","ten","eleven","administratives"];
const statusOfClass = ['upcoming','ongoing','completed','canceled'];

function validateClass(clz){
    const schema = Joi.object({
        className:Joi.string().max(250).required(),
        grade:Joi.string().valid(...grades).lowercase().required(),
        classLink:Joi.string().max(500).required(),
        classTime:Joi.date().required(),
        lesson:Joi.string().max(50).required(),
        classStatus:Joi.string().valid(...statusOfClass).required()
    });

    return schema.validate({
        className:clz.className,
        grade:clz.grade,
        classLink:clz.classLink,
        classTime:clz.classTime,
        lesson:clz.lesson,
        classStatus:clz.classStatus
    });
}

exports.Class = Class;
exports.validateClass = validateClass;