
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname,'../data/usersDataBase.json');
const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');

// FUNCION PARA LEER EL ARCHIVO PRODUCTS JSON 
const users = JSON.parse(fs.readFileSync(usersFilePath,'utf8'));
const products = JSON.parse(fs.readFileSync(productsFilePath,'utf8'));

const dataController = {
    usersData: (req,res)=> {
        res.send(users)
    },
    productsData: (req, res)=>{
        res.send(products)
    }
}

module.exports = dataController