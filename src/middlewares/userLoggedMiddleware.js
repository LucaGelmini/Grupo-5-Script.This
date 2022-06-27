const db = require('../database/models');

async function userLoggedMiddleware (req,res,next){
    
    const emailInCookie = req.cookies.userEmail;
    const loggedUser = req.session.loggedUser

    if(loggedUser){
        res.locals.isLogged = true;
        res.locals.loggedUser = loggedUser;
        return next();
    };
    if(emailInCookie){
        try{
            const userFromCookie = await db.User.findOne({ where: {email: emailInCookie}});
            if(userFromCookie !== null){
                req.session.loggedUser = userFromCookie;
                res.locals.isLogged = true;
                res.locals.loggedUser = userFromCookie;
                return next();
            }
            console.log('ERROR: User from cookie is not found');
        }catch{
            console.log('ERROR DB')
            res.send('error en la base de datos')
            return null;
        }
    }
    res.locals.isLogged = false;
    next();
};

module.exports = userLoggedMiddleware;