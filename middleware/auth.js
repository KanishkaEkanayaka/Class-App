const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req,res,next){
    //get the value of x-auth-token
    const token = req.header('x-auth-token');
    //if no value then don't provide access.
    if(!token) return res.status(401).send('Access denied. No token provided.'); //401 -> unauthorized

    //verify the token came with header and decode it.If the keys are different this won't decoded.
    try{
        const decoded = jwt.verify(token,config.get('jwt.privateKey'));
        req.user = decoded;
        next();
    }catch(ex){
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;