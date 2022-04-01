 
const {validationResult} = require('express-validator');
const path = require('path');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { resolveSoa } = require('dns');

const usersController = {
    loginView: (req, res)=>{
        res.render('login')
    },
    login: (req, res)=>{
        let loginData = req.body;
        const validation = validationResult(req);
        let userInDB = Users.findByField('username',loginData.username)
        let password = loginData.password;
        let noMatch = {
            value: true,
            msg: 'Usuario o ontraseña incorrecta'
        }

        if (validation.errors.length === 0){
            bcrypt.compare(password, userInDB.password, (err, pass)=>{
                err ? console.log(err) : null;
                pass ? res.send('Bienvenido' + userInDB.username) : res.render('login', {errors: noMatch, oldData: loginData})
            });
        }else{
            res.render('login',{
                errors: validation.mapped(),
                oldData: loginData
            });
            console.log(validation.mapped())
        }
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