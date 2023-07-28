const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){
    const token = req.header('x-payment-token');
    if(!token) return res.status(401).send('Access denied. No payment done.');

    
}