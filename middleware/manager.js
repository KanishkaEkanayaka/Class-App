module.exports = function(req,res,next){
    if(!req.user.role === 'manager') return res.status(403).send('Access denied');
    next();
}