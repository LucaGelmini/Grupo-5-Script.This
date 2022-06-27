const {validationResult} = require('express-validator')
const db = require('../database/models')
// const unitsModel = require('../database/models/UnitMeasure')

const unidades = {
    getAll: function(req,res){
        db.UnitMeasure.findAll()
            .then(unit =>{            
                return res.render('listUnitsMeasures',{unidades:unit})
            })
    },
    crear: function(req,res){
        res.render('unitsCreate')
    },
    creacion: function(req,res){ 
        db.UnitMeasure.findAll()
            .then(respuesta=>{
                const validaciones = validationResult(req)   
                if(validaciones.errors.length > 0){
                    res.render('unitsCreate'
                    ,{
                        errors: validaciones.mapped(),
                        oldData:req.body
                    }
                    )
                }else{                 
                    let existe=respuesta.find(unidad => unidad.dataValues.type== req.body.unidad)
                    if(existe == undefined){
                        db.UnitMeasure.create({
                            type:req.body.unidad
                        })
                        res.redirect('/units')
                    }else{
                        res.render('unitsCreate',{
                            mensajes: 'Ya existe esta unidad en la base de datos',
                            oldData:req.body
                        })
                    }
                } 
            })
       
    },
    editar: function(req,res){        
        db.UnitMeasure.findByPk(req.params.id)
            .then(unit =>{
                return  res.render('updateUnits',{unidades:unit})
            })
       
    },
    edicion: function(req,res){
        let unidadEditada=req.body.datoEditar
        let id = req.params.id       
        db.UnitMeasure.update({type:unidadEditada }
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
        db.UnitMeasure.destroy({
            where:{
                type: idEliminar
            }
        })
        res.redirect('/units')
    }
}
module.exports = unidades