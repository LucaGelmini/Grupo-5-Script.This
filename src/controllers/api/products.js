const db = require('../../database/models')

const productsController = {
    findAll: function(req, res){
        db.Product.findAll({
            include: [
                {association: "cartOrders"},
                {association: "unitMensure"},
                {association: "exposition"},
                {association: "category"}
            ],
            
        })
        .then(respuesta =>{
            return res.status(200).json({
                data:respuesta,
                status:200
            })
        })
    },
    moreExpensive: function (req, res){
        console.log(req.params.page)
        let page = 
        req.params.page != undefined ?
        req.params.page : 1;
        console.log((page - 1) * 5)
        db.Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            limit: 5,
            offset: (page - 1) * 5
        }).then(respuesta => {
            return res.status(200).json({
                data:respuesta,
                status:200
            })
        })
    }
}

module.exports = productsController;