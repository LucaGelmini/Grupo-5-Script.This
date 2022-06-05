

const cartOrderController = {
    cart: (req, res)=>{
        res.render('cartOrder')
    },
    purchase: (req, res) => {
        console.log(req.body)
        res.redirect('/')
        
    }
}

module.exports = cartOrderController