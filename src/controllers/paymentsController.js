const {validationResult} = require('express-validator')
const db = require('../database/models')
const Payment = require('../database/models/Payment')
const unidades = {
    getAll: function(req,res){
        db.Payment.findAll()
            .then(payment =>{
                return res.render('payments',{payment:payment})
            })
    },
    crear: function(req,res){
        res.render('paymentCreate')
    },
    creacion: function(req,res){
        db.Payment.findAll()
            .then(respuesta=>{
        const validaciones = validationResult(req)
         if(validaciones.errors.length > 0){
             res.render('paymentCreate'
             ,{
                 errors: validaciones.mapped(),
                 oldData:req.body
             }
             )
         }else{                 
                let existe = respuesta.find(payment => payment.dataValues.method== req.body.payment)
                if(existe == undefined){
                    db.Payment.create({
                        method:req.body.payment
                    })
                    res.redirect('/payments')
                }else{
                    res.render('paymentsCreate',{
                        mensajes: 'Ya existe este método de pago en la base de datos',
                        oldData:req.body
                    })
                }
         }
        db.Payment.create({
            method:req.body.payment
        })
            res.render('/payments')
    })
    },
    editar:function(req,res){
        db.Payment.findByPk(req.params.id)
        .then(function(payment){
            res.render('paymentUpdate',{payment:payment})
        })
    },
    update:function(req,res){
db.Payment.update({
    method: req.body.payment
}, {where: {id: req.params.id}})
res.redirect('/payments')
    },
    eliminar:function(req,res){
        res.render('paymentDelete')
    },
    eliminacion: function(req,res){
        const idEliminar = req.params.id   
         db.Payment.destroy({
             where:{
                 method: idEliminar
             }
         })
         res.redirect('/payments')
     }
    }
module.exports = unidades