const {validationResult} = require('express-validator')
const db = require('../database/models')
const unitsModel = require('../database/models/Status')
const estatus = {
    getAll: function(req,res){
        db.Exposition.findAll()
            .then(status =>{
        console.log("statussssss: "+ status)
            
                return res.render('listEstatus',{estatus:status})
            })
    },
    gettingAll: function(req,res){
        db.Exposition.findAll()
            .then(respuesta =>{                
                return res.status(200).json({
                    data: respuesta,
                    status:200
                })
            }
            )
            .catch(console.log)
    },
    crear: function(req,res){
        res.render('estatusCreate')
    },
    creacion: function(req,res){
        const validaciones = validationResult(req)
   
        if(validaciones.errors.length > 0){
            res.render('estatusCreate'
            ,{
                errors: validaciones.mapped(),
                oldData:req.body
            }
            )
        }else{
            db.Exposition.create({
                type:req.body.unidad
            })
            res.redirect('/estatus')
        }

    },
    editar: function(req,res){
        
        db.Exposition.findByPk(req.params.id)
            .then(unit =>{   

                return  res.render('upDateEstatus',{estatus:unit})
            })
       
    },
    edicion: function(req,res){
        let unidadEditada=req.body.datoEditar
        let id = req.params.id
   
        
        db.Exposition.update({type:unidadEditada }
            ,{
            where:{
                id
            }
        }
        )
        res.redirect('/estatus')
    },
    eliminar:function(req,res){
        res.render('unitsDelete')
    },
    eliminacion: function(req,res){
       const idEliminar = req.params.id
   
        db.Exposition.destroy({
            where:{
                type: idEliminar
            }
        })
        res.redirect('/estatus')
    }

}
module.exports = estatus