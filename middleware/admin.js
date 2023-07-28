//middleware to check whether the given JWT contains asAdmin true or not.
module.exports = function(res,req,next){
    if(!req.user.role === 'admin') return res.status(403).send('Access denied'); //403->forbidden
    next();
}