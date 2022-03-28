//1. Crear y guardar un producto --> leer array de productos + push nuevo producto + sobre escribir cambios.
//2. Buscar un producto por su ID o por sus campos field
//3. Editar un producto
//4. Eliminar un producto


const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
 


const Products = {
    getData: function(){
       return JSON.parse(fs.readFileSync(productsFilePath,'utf-8'));
    },
    findAll: function(){
        return this.getData();
    },
    generateId: function(){
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
    
        if(lastProduct){
            return lastProduct.id + 1;
        } else {
            return 1;
        }
        // OTRA ALTERNATIVA PARA ID --> newProduct.id = (Math.max.apply(null,products.map(product=>product.id)))+1
    },
    findByPk: function(id){
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct=> oneProduct.id == id);
        return productFound;
    },
    findByField: function (field, text){
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct[field] === text);
        return productFound;
    },
    create: function (productToCreate){
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...productToCreate,
        }
        //newProduct.image = filename;
        newProduct.mensure_value = Number(newProduct.mensure_value);
        newProduct.price = Number(newProduct.price);
        newProduct.discount = Number(newProduct.discount);
        allProducts.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(allProducts, null, ' '));
        return true;
    },
    delete: function (id){
        let allProducts = this.findAll();
        let finalProducts = allProducts.filter(oneProduct=>oneProduct.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        return true
        // OTRA ALTERNATIVA PARA ELIMINAR UN PRODUCTO --> products.splice ((idProduct-1),1)
    }
}

  

module.exports = Products;