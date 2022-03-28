 
const {validationResult} = require('express-validator');
const path = require('path');
const Users = require('../models/Users');

const usersController = {
    loginView: (req, res)=>{
        res.render('login')
    },
    login: (req, res)=>{
        let loginData = req.body;
        res.send(loginData);
    },
    registerView: (req, res)=>{
        res.render('register')
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
            let userCreated = Users.create(userData);
            res.redirect('/users/login')
        }

    } 
}
 
module.exports = usersController;