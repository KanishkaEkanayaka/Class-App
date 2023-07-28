const mongoose = require('mongoose');
const Joi = require('joi');
const JoiOid = require('joi-oid');
const jwt = require('jsonwebtoken');
const {User} = require('./user');
const { config } = require('winston');

const paymentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, // If we give invalid author id, mongoose not going to give error. just save it as a reference to author document.
        ref: 'User',
        required:true
    },
    paymentDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    paidMonth:{
        type: String,
        required: true,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    year: {
        type: Number,
        required: true,
    },
    receipt:{
        type:String,
        required:true,
        maxlength:500
    },
    note:{
        type:String,
        minlength:5,
        maxlength:200
    },
    paymentStatus:{
        type:String,
        required:true,
        enum:['notpaid','pending','approved','free'],
        lowercase:true,
        trim:true,
        default:'notpaid'
    }
});

const Payment = mongoose.model('Payment',paymentSchema);

//create array of months
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//create array od payment status
const paymentStatus = ['notpaid','pending','approved','free'];

//Check month with the year whether it has already paid. If paid reject the payment otherwise accept the payment.
paymentSchema.methods.setYear = function(){
    const today = new Date();
    this.year = today.getFullYear();
}

//To set free card
paymentSchema.methods.setFreeCard = function(){
    this.paymentStatus = 'free';
}

//generate payment token
paymentSchema.methods.generatePaymentToken = async function(){
    const payments = await Payment.find({user:this.user}).populate().select('paymentStatus','year','paidMonth');
    const token = jwt.sign({payments:payments},config.get('jwt.privateKey'));
    return token;
}

function validatePayment(payment){
    const schema = Joi.object({
        userId:JoiOid().required(),
        paidMonth:Joi.string().valid(...months).required(),
        paymentStatus:Joi.string().valid(...paymentStatus).lowercase().required(),
        receipt:Joi.string().max(500).required(),
        note: Joi.string().max(200)
    });

    return schema.validate({
        userId:payment.userId,
        paidMonth:payment.paidMonth,
        paymentStatus:payment.paymentStatus,
        receipt:payment.receipt,
        note:payment.note
    });
}

exports.Payment = Payment;
exports.validatePayment = validatePayment;
