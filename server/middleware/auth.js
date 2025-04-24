function requireLogin(req,res,next){
    if(!req.session.user){
        return res.redirect("/login");
    }
    next();
}

function requireAdmin(req,res,next){
    if(!req.session.user || req.session.role !== 'admin'){
        return res.status(403).send("just admin can reach");
    }
    next();
}

module.exports = {requireLogin, requireAdmin };