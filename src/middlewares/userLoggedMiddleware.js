// const Users = require('../models/Users');
const db = require('../database/models');

// module.exports = (req, res, next)=>{
//     if (req.cookies.recordarLogin && !req.session.logedUser){
//             req.session.logedUser = req.cookies.recordarLogin;
//         }
//     next();
// }
function userLoggedMiddleware (req,res,next){
    res.locals.isLogged = false;

    if(req.session.logedUser){
        res.locals.isLogged = true;
        res.locals.logedUser = req.session.logedUser;
    }


    if(req.cookies.userEmail != undefined){

      
            db.User
            .findOne({where:{email: req.cookies.userEmail}})
            .then(userFromCookie => { 
                 console.log(userFromCookie);
                 req.session.logedUser = userFromCookie;
                 if(req.session.logedUser){
                    res.locals.isLogged = true;
                    res.locals.logedUser = req.session.logedUser;
                }
            })
    }
    next();
}
module.exports = userLoggedMiddleware;