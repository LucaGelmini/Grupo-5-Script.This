 
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');

// FUNCION PARA LEER EL ARCHIVO PRODUCTS JSON 
const products = JSON.parse(fs.readFileSync(productsFilePath,'utf8'));

// FUNCION PARA SOBRE ESCRIBIR EL ARCHIVO PRODUCTS JSON
const uploadDataJsonProducts = (newUpdate)=>{fs.writeFileSync(productsFilePath,JSON.stringify(newUpdate))};

const productsController = {
    //Root - Show all products
    allProducts:(req,res) => {
        res.render('products',{products});
    },

    // Detail - Detail from one product
    detail: (req,res) => {
        let idProduct = req.params.id
        let productDetail = products.find(product=> product.id == idProduct);
        res.render('detail', {productDetail});
    }, 

	// Create - Form to create
    create: (req, res)=>{
        res.render('product-create-form');
    },

    // Create -  Method to store - //PARA "CREAR Y GUARDAR" => CONSULTAR (LEER) + PUSH (INCORPORAR CAMBIOS) + SOBRE ESCRIBIR CAMBIOS
    store: (req, res)=>{
        res.redirect('/products');
    },

    // Update - Form to edit
    edit:(req, res)=>{
        let idProduct = req.params.id;
        let productToEdit = products.find(product=>product.id == idProduct);
        res.render('product-edit-form', {productToEdit});
    },

    // Update - Method to update - //PARA "EDITAR Y GUARDAR" => CONSULTAR (LEER) + ASIGNAR CAMBIOS CON DOT.NOTATION + SOBRE ESCRIBIR CAMBIOS
    update:(req, res)=>{
        let idProduct = req.params.id;
        let productEdited = req.body

        products.forEach(product=>{
            if(product.id == idProduct){
                product.name = productEdited.name
				product.unit_mensure = productEdited.unit_mensure
				product.mensure_value = productEdited.mensure_value
				product.price = productEdited.price
				product.discount = productEdited.discount
                product.category = productEdited.category
                product.exposicion = productEdited.exposicion
                product.description = productEdited.description
                
        }
        })
        uploadDataJsonProducts(products)
        res.redirect('/products')
    },

    delete: (req, res)=>{
        let idProduct = req.params.id
		products.splice ((idProduct-1),1)
		updateDataJsonProducts(products)
		res.redirect('/products')
         
    } 

}

module.exports = productsController;