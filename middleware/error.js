const {logDetailedErrorInfo} = require('../startup/logger');

//middleware to run when exception occurs
module.exports = function(err, req, res, next){
    logDetailedErrorInfo(err.message,err);
    res.status(500).send('Something failed');//500->Internal server error.
}