const mongoose = require('mongoose');
const Joi = require('joi');
const JoiOid = require('joi-oid');
const {taskSchema} = require('./task');
const {userSchema} = require('./user');
const {File, fileSchema} = require('./file');

const submitSchema = new mongoose.Schema({
    task:{
        type:taskSchema
    },
    user:{
        type:userSchema,
        required:true
    },
    file:{
        type: mongoose.Schema.Types.ObjectId, // If we give invalid author id, mongoose not going to give error. just save it as a reference to author document.
        ref: 'File',
        required:true
    }
});

const Submit = mongoose.model('Submit',submitSchema);

function validateSubmit(submit){
    const schema = Joi.object({
        taskId: JoiOid().required(),
        userId:JoiOid().required(),
        fileId:JoiOid().required()
    });

    return schema.validate({
        taskId:submit.taskId,
        userId:submit.userId,
        fileId:submit.fileId
    });
}

exports.Submit = Submit;
exports.validateSubmit = validateSubmit;
