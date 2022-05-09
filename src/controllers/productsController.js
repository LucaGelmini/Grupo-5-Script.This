 
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const Products = require('../models/Products');
const db = require('../database/models')
const Product = db.Product
const {validationResult} = require('express-validator');
const internal = require('stream');



// FUNCION PARA LEER EL ARCHIVO PRODUCTS JSON 
const products = JSON.parse(fs.readFileSync(productsFilePath,'utf8'));

// FUNCION PARA SOBRE ESCRIBIR EL ARCHIVO PRODUCTS JSON
const uploadDataJsonProducts = (newUpdate)=>{fs.writeFileSync(productsFilePath,JSON.stringify(newUpdate))};


const productsController = {
    //Root - Show all products
    allProducts:(req,res) => {
        let products = Products.findAll();
        res.render('products',{
            products});
    },

    // Detail - Detail from one product
    detail: (req,res) => {
        let idProduct = req.params.id;

        Product.findByPk(idProduct,{
            include: [
                {association: "cartOrders"},
                {association: "unitMensure"},
                {association: "exposition"},
                {association: "category"}
            ]
        }).then(productDetail => res.render('detail', {productDetail}))
    }, 

	// Create - Form to create
    create: (req, res)=>{  
        res.render('product-create-form');
    },

    // Create -  Method to store - //PARA "CREAR Y GUARDAR" => CONSULTAR (LEER) + PUSH (INCORPORAR CAMBIOS) + SOBRE ESCRIBIR CAMBIOS
    store: (req, res)=>{
        const validation = validationResult(req);
        if(validation.errors.length > 0){
            res.render('product-create-form',{
                errors: validation.mapped(),
                oldData: req.body
            })
        }
        if(validation.errors.length === 0){
                     let productToCreate = {
                        ...req.body,
                        image: req.file.filename
                    }
                    //borro esto porque la db necesia una foreignKey de
                    //de las unidades de medida, no un string. Cambiar en vista?
                    delete productToCreate.unit_mensure;
                    delete productToCreate.category;
                    delete productToCreate.exposicion;
                    
                    // completo estos valores que no llegan por post por ahora. Hago la condicion por si se
                    // los quisieramos pasar por postman

                    productToCreate.exposition_id ? null : productToCreate.exposition_id = 1;
                    productToCreate.unit_mensure_id ? null : productToCreate.unit_mensure_id = 1;
                    productToCreate.category_id ? null : productToCreate.category_id = 1;
                    productToCreate.stock ? null : productToCreate.stock = 100;
                    

                    Product.create(productToCreate)
                    res.redirect('/products');
        }
    },

    // Update - Form to edit
    edit:(req, res)=>{
        let idProduct = req.params.id;
        let productToEdit = Products.findByPk(idProduct);
        res.render('product-edit-form', {productToEdit});
    },

    // Update - Method to update - //PARA "EDITAR Y GUARDAR" => CONSULTAR (LEER) + ASIGNAR CAMBIOS CON DOT.NOTATION + SOBRE ESCRIBIR CAMBIOS
    update:(req, res)=>{
        let idProduct = req.params.id;    
        
        let productEdited = {
            ...req.body,
            image: req.file.filename
        }
        
        //borro esto porque la db necesia una foreignKey de
        //de las unidades de medida, no un string. Cambiar en vista?
        delete productEdited.unit_mensure;
        delete productEdited.category;
        delete productEdited.exposicion;
        
        // completo estos valores que no llegan por put por ahora
        productEdited.exposition_id ? null : productEdited.exposition_id = 1;
        productEdited.unit_mensure_id ? null : productEdited.unit_mensure_id = 1;
        productEdited.category_id ? null : productEdited.category_id = 1;
        productEdited.stock ? null : productEdited.stock = 100 ;
        
        Product.update(productEdited, {
            where: {id: idProduct}
        })
    
        res.redirect('/products')
    },
    
    destroy: (req, res)=>{
        let idProduct = req.params.id;
        db.Order.destroy({
            where: {product_id: idProduct}
        }).then(
            Product.destroy({
                where: {id: idProduct}
            })
        )      

        res.redirect('/products')
         
    } 

}

module.exports = productsController;