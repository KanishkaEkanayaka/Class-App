const express = require('express');
const error = require('../middleware/error');
const helmet = require('helmet');

module.exports = function(app){
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    


    //error middleware
    app.use(error);
}