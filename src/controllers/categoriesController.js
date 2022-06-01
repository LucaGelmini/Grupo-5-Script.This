const {validationResult} = require('express-validator')
const db = require('../database/models')
const Category = require('../database/models/Category')
const unidades = {
    getAll: function(req,res){
        db.Category.findAll()
            .then(categories =>{
                return res.render('categories',{categories:categories})
            })
    },
    crear: function(req,res){
        res.render('categoriesCreate')
    },
    creacion: function(req,res) {
    db.Category.findAll()
    .then(respuesta=>{
const validaciones = validationResult(req)
 if(validaciones.errors.length > 0){
     res.render('categoriesCreate'
     ,{
         errors: validaciones.mapped(),
         oldData:req.body
     }
     )
 }else{                 
        let existe = respuesta.find(categories => categories.dataValues.name== req.body.categories)
        if(existe == undefined){
            db.Category.create({
                name:req.body.categories
            })
            res.redirect('/categories')
        }else{
            res.render('categoriesCreate',{
                mensajes: 'Ya existe esta categoria en la base de datos',
                oldData:req.body
            })
        }
 }
db.Category.create({
    name:req.body.categories
})
    res.render('/categories')
    })
},
    editar:function(req,res){
        db.Category.findByPk(req.params.id)
        .then(function(categories){
            res.render('categoriesUpdate',{categories:categories})
        })
    },
    update:function(req,res){
db.Category.update({
    name: req.body.categories
}, {where: {id: req.params.id}})
res.redirect('/categories')
    },
    eliminar:function(req,res){
        res.render('categoriesDelete')
    },
    eliminacion: function(req,res){
        const idEliminar = req.params.id   
         db.Category.destroy({
             where:{
                 name: idEliminar
             }
         })
         res.redirect('/categories')
     }
}
module.exports = unidades