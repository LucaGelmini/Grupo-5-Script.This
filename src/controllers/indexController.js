const db = require('../database/models')


const indexController = {
    index: (req,res) => {
        res.render('index');
    },
    search: (req,res) => {
        //let indexSearch = req.query.keywords;
        //let SearchResults = products.includes()
        res.render('search')
    },
    testDb: (req, res) => {
        /*res.send(typeof db.Product)*/

        db.Product.findAll({
            include: [
                {association: "cartOrders"},
                {association: "unitMeasure"},
                {association: "exposition"},
                {association: "category"}
            ]
        })
            .then(selected => res.json(selected))
    }
    
}

module.exports = indexController;