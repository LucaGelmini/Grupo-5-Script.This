const db = require('../../database/models')

const productsController = {
    findAll: function(req, res){
        db.Product.findAll()
        .then(respuesta =>{
            return res.status(200).json({
                data:respuesta,
                status:200
            })
        })
    },
    moreExpensive: function(req, res){
        console.log(req.query.page)
        let page = 
        req.query.page != undefined ?
        req.query.page : 1;
        page = Number(page);
        console.log(page  * 5)
        db.Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            limit: 5,
            offset: page * 5
        }).then(respuesta => {
            return res.status(200).json({
                data:respuesta,
                status:200
            })
        })
    },
    bestSellers: function(req, res){
        let page = 
        req.query.page != undefined ?
        req.query.page : 1;
        page = Number(page);

        db.Product.findAll({
            include: [
                {association: "cartOrders"},
                {association: "unitMensure"}
            ]
            
        })
        .then(respuesta =>{
            let bestSellers = respuesta.map(product=>{
                return {
                    name: product.name,
                    totalQuantity: Object.values(product.cartOrders // de las Orders que mapeamos nos quedamos con un array de las cantidades
                        .map(co => co.Order.product_quantity)) //mapeamos todos los cartOrders quedandonos las orders
                            .reduce((prev, current)=> prev + current,0), // devuelve el total de ordenes sumando las cantidades de cada orden
                    unitMensure: product.unitMensure.type
                    } 
            })
            bestSellers.sort((a, b)=> b.totalQuantity-a.totalQuantity) //ordeno el objeto en orden descendente por cantidad
            let startPage = page*5
            let endPage = (page+1)*5
            let total = 0
            bestSellers.forEach(element => {
                total += element.totalQuantity
            });


            return res.status(200).json({
                data: [
                    ...bestSellers.slice(startPage, endPage),
                    {total}
                ],
                status:200
            })
        })
        
    }
}

module.exports = productsController;