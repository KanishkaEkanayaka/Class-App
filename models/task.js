const mongoose = require('mongoose');
const Joi = require('joi');
const JoiOid = require('joi-oid');
const {testSchema} = require('./test');
const {userSchema} = require('./user');

const taskSchema = new mongoose.Schema({
    test:{
        type:testSchema,
        required:true
    },
    students:{
        type:[userSchema],
        required:true
    }
});

const Task = mongoose.model('Task',taskSchema);

function validateTask(task){
    const schema = Joi.object({
        testId:JoiOid().required(),
        studentId:Joi.array().items(JoiObjectId().required()).required()
    });

    return schema.validate({
        testId:task.testId,
        studentArrayId:task.studentArrayId
    });
}


exports.Task = Task;
exports.taskSchema = taskSchema;
exports.validateTask = validateTask;