const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname,'../data/usersDataBase.json');
//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')

// FUNCION PARA LEER EL ARCHIVO PRODUCTS JSON 
//const users = JSON.parse(fs.readFileSync(usersFilePath,'utf8'));
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// FUNCION PARA SOBRE ESCRIBIR EL ARCHIVO PRODUCTS JSON
//const uploadDataJsonUsers = (newUpdate)=>{fs.writeFileSync(usersFilePath,JSON.stringify(newUpdate))};

const indexController = {
    index: (req,res) => {
        res.render('index', {logedUser: req.session.logedUser});
    },
    search: (req,res) => {
        //let indexSearch = req.query.keywords;
        //let SearchResults = products.includes()
        res.render('search')
    }
    
}

module.exports = indexController;