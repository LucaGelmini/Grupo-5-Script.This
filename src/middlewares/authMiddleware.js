function authMiddleware (req, res, next) {
    if(!req.session.logedUser){
       return res.redirect('/users/login');
    }
    next();
};

module.exports = authMiddleware;