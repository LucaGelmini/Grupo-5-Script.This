function guestMiddleware (req, res, next){
    if(req.session.loggedUser){
       return  res.redirect('/users/profile');
    }

    next();
}

module.exports = guestMiddleware