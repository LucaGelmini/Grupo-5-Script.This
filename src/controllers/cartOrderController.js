const db = require('../database/models');
 

const cartOrderController = {
    cart: (req, res)=>{
        res.send('hola')
        // res.render('cartOrder')
    },
    purchase: (req, res) => {
        console.log(req.body);
        let objectForm = req.body;
        let totalArray = req.body.total;
        let total = 0;

        totalArray.forEach(subtotal => {
            total = total + Number(subtotal)
        });
         
        
       
        // cartOrderData.forEach(order => {
        //    let totalOrder = Number(order.product_quantity)  * Number(order.price.replace('$', '')) 
           
        //    console.log(parseFloat(totalCartOrder).toFixed(2) );
        //    console.log(Number(parseFloat(order.price.replace('$', '')).toFixed(2)));
        //    totalCartOrder = totalCartOrder + totalOrder
        // }); 
       
        let cartOrderCreated = {
            total: total,
            user_id: req.session.loggedUser.id,
            payment_id: 4,
            status_id: 2
        }
        
        db.CartOrder
				.create({
                    ...cartOrderCreated
				})
				.then(()=>{
					res.redirect('/');
				})
				.catch(err =>{res.send(err)});
        
    } 
}

module.exports = cartOrderController