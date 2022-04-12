function guestMiddleware (req, res, next){
    if(req.session.logedUser){
       return  res.redirect('/users/profile');
    }

    next();
}

module.exports = guestMiddleware