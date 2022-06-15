const db = require('../../database/models');
const { productsData } = require('../dataController');

const productsController = {
    findAll: function(req, res){
        db.Product.findAll({
            include: [
                {association: 'unitMensure'},
                {association: 'exposition'},
                {association: 'category'}
            ]
        })
        .then(respuesta =>{
            let total = respuesta.length;
            
            let categoriesArray = respuesta.map(product => product.category.name);
            let byCategories = {}
            categoriesArray.forEach(function (x) { byCategories[x] = (byCategories[x] || 0) + 1; });

            let unitMensureArray = respuesta.map(product => product.unitMensure.type);
            let byunitMensure = {}
            unitMensureArray.forEach(function (x) { byunitMensure[x] = (byunitMensure[x] || 0) + 1; });

            let ExpositionArray = respuesta.map(product => product.exposition.type);
            let byExposition = {}
            ExpositionArray.forEach(function (x) { byExposition[x] = (byExposition[x] || 0) + 1; });


            let processed = {
                total,
                byCategories,
                byunitMensure,
                byExposition

            }

    


            return res.status(200).json({
                data:processed,
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