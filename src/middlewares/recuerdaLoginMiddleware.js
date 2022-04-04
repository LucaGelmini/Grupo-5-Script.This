module.exports = (req, res, next)=>{
    if (req.cookies.recordarLogin && !req.session.logedUser){
            req.session.logedUser = req.cookies.recordarLogin;
        }
    next();
}