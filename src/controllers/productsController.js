// const Products = require('../models/Products');
const db = require('../database/models');
const Product = db.Product;
const Op = db.Sequelize.Op;
const {validationResult} = require('express-validator');




const productsController = {
    //Root - Show all products
    allProducts:(req,res) => {
        // let products = Products.findAll();
        db.Product
        .findAll({
            include: [
                {association: 'unitMeasure'},
                {association: "category"}
            ]
        })
        
        .then(products => res.render('products', {products}))
         

        // res.render('products',{
        //     products});
    },

    // Detail - Detail from one product
    detail: (req,res) => {
        let idProduct = req.params.id;

        db.Product
        .findByPk(idProduct,{
            include: [
                {association: "cartOrders"},
                {association: "unitMeasure"},
                {association: "exposition"},
                {association: "category"}
            ]
        }).then(productDetail => res.render('detail', {productDetail}))
    }, 

	// Create - Form to create
    create: (req, res)=>{  
        let idProduct = req.params.id;
        let secondaryTables = {
            exposition: null,
            unitMeasure: null,
            category: null
        }
        Promise.all([
            db.Exposition.findAll(),
            db.UnitMeasure.findAll(),
            db.Category.findAll()
        ])
        .then(([exposition,unitMeasure,category]) => {
            secondaryTables.exposition = exposition;
            secondaryTables.unitMeasure = unitMeasure;
            secondaryTables.category = category;

            res.render('product-create-form', {secondaryTables});
        })
    },

    // Create -  Method to store - //PARA "CREAR Y GUARDAR" => CONSULTAR (LEER) + PUSH (INCORPORAR CAMBIOS) + SOBRE ESCRIBIR CAMBIOS
    store: (req, res)=>{
        const validation = validationResult(req);
        console.log(req.body)
        if(validation.errors.length > 0){
            console.log(validation.mapped())
            res.render('product-create-form',{
                errors: validation.mapped(),
                oldData: req.body
            })
        }
        if(validation.errors.length === 0){
            console.log(req.body)
            let productToCreate = {
            ...req.body,
            stock:100,
            image: req.file.filename
            }

            Product.create(productToCreate)
            res.redirect('/products');
        }
    },

    // Update - Form to edit
    edit:(req, res)=>{
        let idProduct = req.params.id;
        let secondaryTables = {
            exposition: null,
            unitMeasure: null,
            category: null
        }
        Promise.all([
            Product.findByPk(idProduct, {
                include: [
                    {association: "unitMeasure"},
                    {association: "exposition"},
                    {association: "category"}
                ]
            }),
            db.Exposition.findAll(),
            db.UnitMeasure.findAll(),
            db.Category.findAll()
        ])
        .then(([productToEdit, exposition,unitMeasure,category]) => {
            secondaryTables.exposition = exposition;
            secondaryTables.unitMeasure = unitMeasure;
            secondaryTables.category = category;

            console.log(productToEdit.category.dataValues)
            res.render('product-edit-form', {productToEdit, secondaryTables});
        })

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
        delete productEdited.unit_measure;
        delete productEdited.category;
        delete productEdited.exposicion;
        
        // completo estos valores que no llegan por put por ahora
        productEdited.exposition_id ? null : productEdited.exposition_id = 1;
        productEdited.unit_measure_id ? null : productEdited.unit_measure_id = 1;
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
         
    },
    find: (req, res)=> {
        let search = req.body.search;

        Product.findOne({
            where: {
                name: {[Op.like]: `%${search}%`}
            }
        }).then(product => {
            if (product){
                res.redirect(`/products/${product.id}`)
            }else{
                res.send(
                    `<h1>Producto no encontrado</h1>
                    <hr>
                    <a href="/">Ir a home</a>`
                    )
            
            }
        })
    }

}

module.exports = productsController;