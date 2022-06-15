 
 
const db = require('../../database/models');
 

const cartOrderController = {
    list: (req, res) => {
        db.CartOrder 
        .findAll(
          {
            attributes:['id', 'total', 'user_id', 'payment_id', 'status_id'],
            include: [
                {association: 'user'},
                {association: 'payment'},
                {association: 'status'}  
            ]
          }
        )
        .then(cartOrders =>{
            return res.status(200).json({ 
                meta:{
                    total: cartOrders.length,
                    status: 200,
                    url: 'http://localhost:3001/api/cartOrder/list'
                },
                data: cartOrders
                 
            })
        })
        .catch(error => res.send(error))     
    },
    pagesList: (req, res) => {
        db.CartOrder 
        .findAll(
          {
            attributes:['id', 'total', 'user_id', 'payment_id', 'status_id'],
            include: [
                {association: 'user'},
                {association: 'payment'},
                {association: 'status'}  
            ]
          }
        )
        .then(cartOrders =>{
            const page = parseInt(req.query.page);
            const limit =  10;
            const startIndex = (page-1)*limit;
            const endIndex = page * limit;
            const results = {};
            
            if(endIndex < cartOrders.length){
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
            results.results = cartOrders.slice(startIndex, endIndex);
            return res.status(200).json({ 
                meta:{
                    total: cartOrders.length,
                    status: 200,
                    url: 'http://localhost:3001/api/cartOrder?page='
                },
                data: results 
                 
            })
        })
        .catch(error => res.send(error))       
    },
    detail: (req, res) => {
        db.CartOrder
        .findByPk(req.params.id,{
            attributes:['id', 'total', 'user_id', 'payment_id', 'status_id'],
            include: [
                {association: 'user'},
                {association: 'payment'},
                {association: 'status'}  
            ]
        })
        .then(cartOrders => {
            return res.status(200).json({ 
                meta:{
                    total: cartOrders.length,
                    status: 200,
                    url: 'http://localhost:3001/api/cartOrder/'+req.params.id
                },
                data: cartOrders  
            })
        })
    } 
}
 
module.exports = cartOrderController;