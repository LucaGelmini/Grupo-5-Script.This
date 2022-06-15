 
 
const db = require('../../database/models');
 

const orderController = {
    list: (req, res) => {
        db.Order 
        .findAll(
          {
            attributes:['id', 'product_quantity', 'total', 'cart_order_id', 'product_id'],
            include: [
                {association: 'product'},
                {association: 'cartOrder'}  
            ]
          }
        )
        .then(Orders =>{
            return res.status(200).json({ 
                meta:{
                    total: Orders.length,
                    status: 200,
                    url: 'http://localhost:3001/api/Order/list'
                },
                data: Orders
                 
            })
        })
        .catch(error => res.send(error))     
    },
    pagesList: (req, res) => {
        db.Order 
        .findAll(
          {
            attributes:['id', 'product_quantity', 'total', 'cart_order_id', 'product_id'],
            include: [
                {association: 'product'},
                {association: 'cartOrder'}
            ]
          }
        )
        .then(Orders =>{
            const page = parseInt(req.query.page);
            const limit =  10;
            const startIndex = (page-1)*limit;
            const endIndex = page * limit;
            const results = {};
            
            if(endIndex < Orders.length){
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }
    
            if(startIndex > 0) {
                results.previus = {
                    page: page - 1,
                    limit: limit
                }
            }
            results.results = Orders.slice(startIndex, endIndex);
            return res.status(200).json({ 
                meta:{
                    total: Orders.length,
                    status: 200,
                    url: 'http://localhost:3001/api/Order?page='
                },
                data: results 
                 
            })
        })
        .catch(error => res.send(error))       
    },
    detail: (req, res) => {
        db.Order
        .findByPk(req.params.id,{
            attributes:['id', 'product_quantity', 'total', 'cart_order_id', 'product_id'],
            include: [
                {association: 'product'},
                {association: 'cartOrder'} 
            ]
        })
        .then(Orders => {
            return res.status(200).json({ 
                meta:{
                    total: Orders.length,
                    status: 200,
                    url: 'http://localhost:3001/api/Order/'+req.params.id
                },
                data: Orders  
            })
        })
    } 
}
 
module.exports = orderController;