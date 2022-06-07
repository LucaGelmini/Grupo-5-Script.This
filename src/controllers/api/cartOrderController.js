const db = require('../../database/models');
const cartOrderController = {
    prueba: (req, res) =>{
        let body = req.body
        console.log(body)

        let cartOrderData = req.body
        let totalCartOrder = 0;
        console.log(cartOrderData)
        cartOrderData.forEach(order => {
           let totalOrder = Number(order.product_quantity)  * Number(order.price.replace('$', '')) 
           
           console.log(parseFloat(totalCartOrder).toFixed(2) );
           console.log(Number(parseFloat(order.price.replace('$', '')).toFixed(2)));
           totalCartOrder = totalCartOrder + totalOrder
        }); 

        console.log(totalCartOrder);
        console.log(req.session.logedUser.id);
        console.log('holaaa llege');
        let cartOrderCreated = {
            total: totalCartOrder,
            user_id: req.session.logedUser.id,
            payment_id: 4,
            status_id: 2
        }

        console.log('ANDA esto? \b' + cartOrderCreated)

        db.CartOrder
        .create(cartOrderCreated)
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/actors/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/actors/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    list: (req, res) => {
        db.CartOrder
        .findAll()
        .then(cartOrders =>{
            return res.status(200).json({ 
                meta:{
                    total: cartOrders.length,
                    status: 200,
                    url: 'http://localhost:3001/api/cartOrder'
                },
                data: cartOrders
                 
            })
        })
        
    }
        
}
module.exports = cartOrderController;