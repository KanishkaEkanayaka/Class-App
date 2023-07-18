const mongoose = require('mongoose');
const Joi = require('joi');
const JoiOid = require('joi-oid');
const jwt = require('jsonwebtoken');
const config = require('config');
const {guardianSchema} = require('./guardian');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:50,
        trim: true
    },
    password:{
        type:String,
        required:true,
        unique:true,
        minlength:8,
        maxlength:100
    },
    grade:{
        type:String,
        required:true,
        enum:["eight","nine","ten","eleven","administratives"],
        lowercase:true,
        trim: true
    },
    role:{
        type:String,
        required:true,
        enum:["student","manager","admin"],
        lowercase:true,
        trim:true
    },
    profilePic:{
        type:String,
        maxlength:300
    },
    address:{
        type:String,
        minlength:5,
        maxlength:255
    },
    phone:{
        type:Number,
        maxlength:10,
        minlength:10
    },
    guardian:{
        type: guardianSchema
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,role:this.role},config.get('jwt.privateKey'));
    return token;
}

const User = mongoose.model('User',userSchema);

//grade check list
const grades = ["eight","nine","ten","eleven","administratives"];
//roles check list
const roles = ["student","manager","admin"];

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(50).required().email(),
        password: Joi.string()
        .min(8)
        .max(100)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        'password'),
        grade: Joi.string().valid(...grades).required(),
        role: Joi.string().valid(...roles).required(),
        profilePic:Joi.string().max(300),
        address:Joi.string().min(5).max(255),
        phone:Joi.number().min(10).max(10),
        guardianId: JoiOid()
    });

    //providing values for validate
    return schema.validate({
        name:user.name,email:user.email,password:user.password,
        grade:user.grade,role:user.role,profilePic:user.profilePic,address:user.address,
        phone:user.phone,guardianId:user.guardianId
    });

}

function validateUserAuth(user){
    const schema = Joi.object({
        email:Joi.string().min(5).max(50).required().email(),
        password:  Joi.string()
        .min(8)
        .max(100)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        'password'),
    });

    return schema.validate({
        email:user.email,
        password:user.password
    });
}

exports.validateUser = validateUser;
exports.validateUserAuth = validateUserAuth;
exports.User = User;
