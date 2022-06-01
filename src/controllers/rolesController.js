const {validationResult} = require('express-validator')
const db = require('../database/models')
const Role = require('../database/models/Role')
const unidades = {
    getAll: function(req,res){
        db.Role.findAll()
            .then(roles =>{
                return res.render('roles',{roles:roles})
            })
    },
    crear: function(req,res){
        res.render('rolesCreate')
    },
    creacion: function(req,res){
        db.Role.findAll()
        .then(respuesta=>{
        const validaciones = validationResult(req)
         if(validaciones.errors.length > 0){
             res.render('rolesCreate'
             ,{
                 errors: validaciones.mapped(),
                 oldData:req.body
             }
             )
         }else{                 
            let existe = respuesta.find(roles => roles.dataValues.name == req.body.roles)
            if(existe == undefined){
                db.Role.create({
                    name : req.body.roles
                })
                res.redirect('/roles')
            }else{
                res.render('rolesCreate',{
                    mensajes: 'Ya existe este rol en la base de datos',
                    oldData:req.body
                })
            }
     }
        db.Role.create({
            name:req.body.roles
        })
        res.redirect('/roles')
        })
    },
    editar:function(req,res){
        db.Role.findByPk(req.params.id)
        .then(function(roles){
            res.render('rolesUpdate',{roles:roles})
        })
        
    },
    update:function(req,res){
db.Role.update({
    name: req.body.roles
}, {where: {id: req.params.id}})
res.redirect('roles')
    },
    eliminar:function(req,res){
        res.render('rolesDelete')
    },
    eliminacion: function(req,res){
        const idEliminar = req.params.id   
         db.Role.destroy({
             where:{
                 name: idEliminar
             }
         })
         res.redirect('/roles')
     }
}
module.exports = unidades