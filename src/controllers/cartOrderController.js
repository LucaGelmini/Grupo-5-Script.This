const db = require('../database/models')


const cartOrderController = {
    cart: (req, res)=>{
        res.render('cartOrder')
    },
    purchase: (req, res) => {
        let cartOrderData = req.body
        let totalCartOrder = 0;
        console.log(typeof cartOrderData)
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
        console.log(cartOrderCreated);
        
        try{
            // db.CartOrder
            // .create({
            //     ...cartOrderCreated
            // })
            // .then(()=>{
            //     console.log('LLEGA???')
                 res.redirect('/');
            // })
            // .catch(err =>{res.send(err)});
        }catch(error){
            console.log(error.message);
            console.log('explotó')
        }
        console.log(db.CartOrder);
        
    }
}

module.exports = cartOrderController