const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname,'../data/usersDataBase.json');
const db = require('../database/models')
//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')

// FUNCION PARA LEER EL ARCHIVO PRODUCTS JSON 
//const users = JSON.parse(fs.readFileSync(usersFilePath,'utf8'));
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// FUNCION PARA SOBRE ESCRIBIR EL ARCHIVO PRODUCTS JSON
//const uploadDataJsonUsers = (newUpdate)=>{fs.writeFileSync(usersFilePath,JSON.stringify(newUpdate))};

const indexController = {
    index: (req,res) => {
        console.log(req.session)
        res.render('index');
    },
    search: (req,res) => {
        //let indexSearch = req.query.keywords;
        //let SearchResults = products.includes()
        res.render('search')
    },
    testDb: (req, res) => {
        //res.send(typeof db.User)

        db.CartOrder.findAll({
            include: [
                {association: "product"},
                {association: "CO_to_orders"}
            ]
        })
            .then(selected => res.json(selected))
    }
    
}

module.exports = indexController;