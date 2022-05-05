 
const {validationResult} = require('express-validator');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs/dist/bcrypt');
const session = require('express-session');
 

const usersController = {
    loginView: (req, res)=>{
        res.render('login')
        
    },
    registerView: (req, res)=>{
         res.render('register')
    },
    profile: (req, res)=>{
         res.render('profile', {})
    },
    logout: (req,res)=>{
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    register: (req, res)=>{
        const validation = validationResult(req);
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;
        let userInDB = Users.findByField('email',req.body.email)

        if(validation.errors.length > 0){
            res.render('register',{
                errors: validation.mapped(),
                oldData: req.body
            })
        } else if ((password && confirmPassword != undefined) && password != confirmPassword) {
            res.render('register',{
                password,
                confirmPassword,
                noSamePassmsg: 'Las contraseñas ingresadas no coinciden!',
                oldData: req.body
            })
        } else if (userInDB) {
            res.render('register',{
                errors: {
                    email:{
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            })
        } else {
            let userData = req.body;
            let userFile = req.file.filename;
            let userToCreate = {
                ...userData,
                userFile
            }
            let userCreated = Users.create(userToCreate);
            res.redirect('/users/login')
        }
    }, 
    login: (req, res)=>{
        const validation = validationResult(req);
        let userInDB = Users.findByField('email',req.body.email)
      
        if(validation.errors.length > 0){ //en el caso de errores
			res.render('login', {
				 errors:validation.mapped(),
				 oldData: req.body});

		} else if (!userInDB) { //en el caso de que user no exista
			res.render('login',{
				errors: {
					email:{
						msg:'El correo electrónico o constraseña son inválidas'
					}
				}
			})
		} else { // No hay errores y ya verificamos que el usuario exista. Comparamos la password.
            bcrypt.compare(req.body.password, userInDB.password)
            .then((passwordOk)=>{
                console.log(passwordOk);
                if(passwordOk){
                    delete userInDB.password;
                    req.session.logedUser = userInDB;
                    console.log(req.session.logedUser);
                    if(req.body.recordame){
                        res.cookie('userEmail', req.body.email, {maxAge: (1000*60)*60})
                    }
                    res.redirect('/users/profile');
                } else {
                    res.render('login', {
                                        errors: {
                                            email: {
                                                msg: 'El correo electrónico o constraseña son inválidas'
                                            }
                                        },
                                        oldData: req.body
                                    });
                }
            });
            
        }
    }
    // ,
    // users: (req, res) =>{
    //     if(req.session.logedUser){
    //        res.render('users', {
    //            user: Users.findByField('username', req.session.logedUser),
    //            logedUser: req.session.logedUser})
    //     }else{
    //         res.redirect('/users/login')
    //     }
    // },
    // editUser: (req, res)=>{
    //     res.redirect('/',{logedUser: req.session.logedUser})
    // }    
}
 
module.exports = usersController;