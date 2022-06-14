const db = require('../../database/models')

const APIController = {
    gettingAllUnits: function(req,res){
        db.UnitMensure.findAll({
            include:'products'
        })
            .then(respuesta =>{
                            
                return res.status(200).json({
                    data:respuesta,
                    count:respuesta.length,
                    status:200
                })
            })
    },
    gettingAllEstatus: function(req,res){
        db.Exposition.findAll({
            include:'products'
        })
            .then(respuesta =>{  
                return res.status(200).json({
                    data: respuesta,
                    count:respuesta.length,
                    status:200
                })
            }
            )
            .catch(console.log)
    },
    gettingAllExpositions: function(req,res){      
        db.Status.findAll({
            include:'cartsOrders'
        })
            .then(respuesta =>{   

                return res.status(200).json({
                    data:respuesta,
                    count:respuesta.length,
                    status:200
                })
            })
            .catch(console.log)
    }

}
module.exports=APIController;