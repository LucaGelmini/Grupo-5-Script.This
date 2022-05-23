const {validationResult} = require('express-validator')
const db = require('../database/models')
const unitsModel = require('../database/models/UnitMensure')
const unidades = {
    getAll: function(req,res){
        db.UnitMensure.findAll()
            .then(unit =>{
            
                return res.render('listUnitsMeasures',{unidades:unit})
            })
    },
    crear: function(req,res){
        res.render('unitsCreate')
    },
    creacion: function(req,res){
        const validaciones = validationResult(req)
   
        if(validaciones.errors.length > 0){
            res.render('unitsCreate'
            ,{
                errors: validaciones.mapped(),
                oldData:req.body
            }
            )
        }else{
            db.UnitMensure.create({
                type:req.body.unidad
            })
            res.redirect('/units')
        }
 
    },
    editar: function(req,res){
        
        db.UnitMensure.findByPk(req.params.id)
            .then(unit =>{
      

                return  res.render('updateUnits',{unidades:unit})
            })
       
    },
    edicion: function(req,res){
        let unidadEditada=req.body.datoEditar
        let id = req.params.id
   
        console.log(unidadEditada)
        db.UnitMensure.update({type:unidadEditada }
            ,{
            where:{
                id
            }
        }
        )
        res.redirect('/units')
    },
    eliminar:function(req,res){
        res.render('unitsDelete')
    },
    eliminacion: function(req,res){
       const idEliminar = req.params.id
   
        db.UnitMensure.destroy({
            where:{
                type: idEliminar
            }
        })
        res.redirect('/units')
    }

}
module.exports = unidades