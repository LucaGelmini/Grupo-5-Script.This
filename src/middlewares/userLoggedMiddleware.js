const Users = require('../models/Users');

// module.exports = (req, res, next)=>{
//     if (req.cookies.recordarLogin && !req.session.logedUser){
//             req.session.logedUser = req.cookies.recordarLogin;
//         }
//     next();
// }

function userLoggedMiddleware (req,res,next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = Users.findByField('email', emailInCookie);

    if(userFromCookie){
        req.session.logedUser = userFromCookie;
    };

    if(req.session.logedUser){
        res.locals.isLogged = true;
        res.locals.logedUser = req.session.logedUser;
    }


    next();
}

module.exports = userLoggedMiddleware;