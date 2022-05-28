const {validationResult} = require('express-validator')
const db = require('../database/models')
const unitsModel = require('../database/models/Status')
const exposition = {
    getAll: function(req,res){
        db.Status.findAll()
            .then(status =>{
     
            
                return res.render('listExposition',{expositions:status})
            })
    },
    gettingAll: function(req,res){
        console.log('entre a server');
        db.Status.findAll()
            .then(respuesta =>{
                
                return res.status(200).json({
                    data:respuesta,
                    status:200
                })
            })
            .catch(console.log)
    },
    crear: function(req,res){
        res.render('expositionCreate')
    },
    creacion: function(req,res){
        db.Status.findAll()
            .then(respuesta=>{
              
                const validaciones = validationResult(req)
           
                if(validaciones.errors.length > 0){
                    res.render('expositionCreate'
                    ,{
                        errors: validaciones.mapped(),
                        oldData:req.body
                    }
                    )
                }else{
                    let existe = respuesta.find(exposition=> exposition.dataValues.name == req.body.unidad)
                    
                    if(existe== undefined){
                        db.Status.create({
                            name:req.body.unidad
                        })
                        res.redirect('/expositions')
                    }else{
                        res.render('expositionCreate',{
                            mensajes:'Ya existe esta exposition en la base de datos',
                            oldData:req.body
                        })
                    }

                }
            })
  
    },
    editar: function(req,res){
        
        db.Status.findByPk(req.params.id)
            .then(unit =>{   

                return  res.render('updateExpositions',{expositions:unit})
            })
       
    },
    edicion: function(req,res){
        let unidadEditada=req.body.datoEditar
        let id = req.params.id
   
        
        db.Status.update({name:unidadEditada }
            ,{
            where:{
                id
            }
        }
        )
        res.redirect('/expositions')
    },
    eliminar:function(req,res){
        res.render('unitsDelete')
    },
    eliminacion: function(req,res){
       const idEliminar = req.params.id
   
        db.Status.destroy({
            where:{
                name: idEliminar
            }
        })
        res.redirect('/expositions')
    }

}
module.exports = exposition