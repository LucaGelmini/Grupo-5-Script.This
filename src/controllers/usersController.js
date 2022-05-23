 
const {validationResult} = require('express-validator');
//const Users = require('../models/Users');
const bcrypt = require('bcryptjs/dist/bcrypt');
const db = require('../database/models');
 

const usersController = {
    loginView: (req, res)=>{
        res.render('login')
        
    },
    registerView: (req, res)=>{
         res.render('register')
    },
    profile: (req, res)=>{
        db.User
		.findByPk(req.session.logedUser.id)
		.then(user => {
			res.render('profile',{user});
		})
		.catch(err => {res.send(err)});
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
        //let userInDB = Users.findByField('email',req.body.email)
        
        
        if(validation.errors.length > 0){
            res.render('register',{
                errors: validation.mapped(),
                oldData: req.body
            })
        } 
        
        db.User
        .findOne({where:{email: req.body.email}})
        .then(userInDB =>{
            if ((password && confirmPassword != undefined) && password != confirmPassword) {
                res.render('register',{
                    password,
                    confirmPassword,
                    noSamePassmsg: 'Las contraseñas ingresadas no coinciden!',
                    oldData: req.body
                })
                .catch(err =>{res.send(err)});
            } else if (userInDB) {
                res.render('register',{
                    errors: {
                        email:{
                            msg: 'Este email ya esta registrado'
                        }
                    },
                    oldData: req.body
                })
                .catch(err =>{res.send(err)});
            } else {

                let userToCreate = req.body
				const passwordHashed = bcrypt.hashSync(req.body.password,10)
                console.log(passwordHashed);
				userToCreate.password = passwordHashed
				delete userToCreate.contrasenaConfirmacion

				db.User
				.create({
					...userToCreate,
			        userfile: req.file.filename 
				})
				.then(()=>{
					res.redirect('/users/login');
				})
				.catch(err =>{res.send(err)});
            }
        })
    }, 
    login: (req, res)=>{
        const validation = validationResult(req);
        //let userInDB = Users.findByField('email',req.body.email)
      
        if(validation.errors.length > 0){ //en el caso de errores
			res.render('login', {
				 errors:validation.mapped(),
				 oldData: req.body});

		} 
        
        db.User
        .findOne({where: {email: req.body.email}})
        .then(userInDB =>{
             
            if (!userInDB) { //en el caso de que user no exista
                res.render('login',{
                    errors: {
                        email:{
                            msg:'El correo electrónico o constraseña son inválidas'
                        }
                    }
                })
            } else { // No hay errores y ya verificamos que el usuario exista. Comparamos la password.
                console.log(bcrypt.compareSync(req.body.password, userInDB.password));
                bcrypt.compare(req.body.password, userInDB.password)
                .then((passwordOk)=>{
                    console.log(req.body.password);
                    console.log(userInDB.password);
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
        })
    },
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
    
    edit: (req,res)=>{
        db.User
		.findByPk(req.session.logedUser.id)
		.then(user => {
			res.render('profile-edit',{user});
		})
		.catch(err => {res.send(err)});
    },

    update: (req, res)=>{
        // console.log(locals.logedUser.id);
        // console.log('Hola llegue al controller');
        // console.log(req.body);
        
        db.User
		.update({
			 fullname: req.body.fullname,
			 adress: req.body.adress,
			 postalcode: req.body.postalcode,
			 phone: req.body.phone
		},
		{
			where: {id: req.session.logedUser.id}
		})
		.then(()=>{
			res.redirect('/users/profile')
		})
		.catch(err => {res.send(err)});
    }
}
 
module.exports = usersController;