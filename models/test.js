const mongoose = require('mongoose');
const Joi = require('joi');
const JoiOid = require('joi-oid');
const {fileSchema,File} = require('./file');

const testSchema = new mongoose.Schema({
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
    startDate:{
        type:Date,
        required:true,
        get: (value) => value.toISOString().split('T')[0], // Custom getter to retrieve only the date part
        set: (value) => new Date(value) // Custom setter to ensure proper Date object is stored    
    },
    endDate:{
        type:Date,
        get: (value) => value.toISOString().split('T')[0], // Custom getter to retrieve only the date part
        set: (value) => new Date(value), // Custom setter to ensure proper Date object is stored    
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    },
    hasFinished:{
        type:Boolean,
        default:false
    }
});

//automatically activate the tests on the given starting date
testSchema.static('activateTests' ,async function(){

    const today = new Date();
    const datePart = today.toISOString().split('T')[0];
    
    await this.updateMany({'startDate':datePart},{$set:{isActive:true}});

});

//automatically end the tests on the given ending date
testSchema.static('endTests',async function(){
    const today = new Date();
    const datePart = today.toISOString().split('T')[0];

    await this.updateMany({'endDate':datePart},{$set:{hasFinished:true}});

});

const Test = mongoose.model('Test',testSchema);

const grades = ["eight","nine","ten","eleven","administratives"];

function validateTest(test){
    const schema = Joi.object({
        name:Joi.string().min(5).max(30).required(),
        fileId:JoiOid().required(),
        grade:Joi.string().valid(...grades).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required()
    });

    return schema.validate({
        name:test.name,
        fileId:test.fileId,
        grade:test.grade,
        startDate:test.startDate,
        endDate:test.endDate
    });
}

exports.Test = Test;
exports.validateTest = validateTest;
exports.testSchema = testSchema;