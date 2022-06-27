 
const {validationResult} = require('express-validator');
//const Users = require('../models/Users');
const bcrypt = require('bcryptjs/dist/bcrypt');
const db = require('../database/models');
const { localsName } = require('ejs');
const { use } = require('../routes');
 

const usersController = {
    loginView: (req, res)=>{
        res.render('login')
        
    },
    registerView: (req, res)=>{
         res.render('register')
    },
    profile: (req, res)=>{
        db.User
		.findByPk(req.session.loggedUser.id)
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
            } 

            if(userInDB){
                console.log(userInDB);
                    res.render('register',{
                        errors: {
                            email:{
                                msg: 'Este email ya esta registrado'
                            }
                        },
                        oldData: req.body
                    })
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
    login: async (req, res)=>{
        const validation = validationResult(req);
      
        if(validation.errors.length > 0){ //en el caso de errores
			res.render('login', {
				 errors:validation.mapped(),
				 oldData: req.body});
            return null;
		} 
        
        let userInDB = await db.User.findOne({
            include: [{association: 'role'}],
            where: {email: req.body.email}
        });
        
             
        if (!userInDB) { //en el caso de que user no exista
            res.render('login',{
                errors: {
                    email:{
                        msg:'El correo electrónico o constraseña son inválidas'
                    }
                }
            })
            return null;
        };

        // No hay errores y ya verificamos que el usuario exista. Comparamos la password.
        const passwordOk = await bcrypt.compare(req.body.password, userInDB.password)
        
        if(passwordOk){
            userInDB = userInDB.dataValues;
            userInDB.role = userInDB.role.name;
            delete userInDB.password;
            res.locals.isLogged =true;
            res.locals.loggedUser = userInDB;
            req.session.loggedUser = userInDB;
            if(req.body.recordame){
                res.cookie('userEmail', req.body.email, {maxAge: (1000*60)*60})
            }
            res.redirect('/users/profile');
            return null;
        } 

        res.render('login', {
            errors: {
                email: {msg: 'El correo electrónico o constraseña son inválidas'}
            },
            oldData: req.body
        });
    },

    edit: (req,res)=>{
        db.User
		.findByPk(req.session.loggedUser.id)
		.then(user => {
			res.render('profile-edit',{user});
		})
		.catch(err => {res.send(err)});
    },

    update: (req, res)=>{
        // console.log(locals.loggedUser.id);
        // console.log('Hola llegue al controller');
        // console.log(req.body);
        const updatedFullname = req.body.fullname;
        const updatedAdress = req.body.adress;
        const updatedPostalcode = req.body.postalcode;
        const updatedPhone = req.body.phone;

        res.locals.loggedUser.fullname = updatedFullname;
        res.locals.loggedUser.adress = updatedAdress;
        res.locals.loggedUser.postalcode = updatedPostalcode;
        res.locals.loggedUser.phone = updatedPhone;
        db.User
		.update({
			 fullname: updatedFullname,
			 adress: updatedAdress,
			 postalcode: updatedPostalcode,
			 phone: updatedPhone
		},
		{
			where: {id: req.session.loggedUser.id}
		})
		.then(()=>{
			res.redirect('/users/profile')
		})
		.catch(err => {res.send(err)});
    }
}
 
module.exports = usersController;