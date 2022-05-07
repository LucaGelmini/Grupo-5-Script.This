//  1. Guardar al nuevo usuario en la BD (leer JSON --> Hacer push --> guardar/ sobre escribir)
//  2. Buscar al usuario que se quiere loguear
//  3. Buscar a un usuario por su ID y/o por cualquier campo (field)
//  4. Editar un usuario
//  5. Eliminar un usuario
 

const bcrypt = require('bcryptjs/dist/bcrypt');
const fs = require('fs');
const path = require('path');
const userFile = path.join(__dirname,'../data/usersDataBase.json')
 

const Users = {

    getData: function(){
        return JSON.parse(fs.readFileSync(userFile, 'utf-8'));
         
    },

    generateId: function (){
        let allUser = this.findAll();
        let lastUser = allUser.pop();
        if(lastUser){
            return lastUser.id + 1; 
        } else {
            return 1;
        }
        
    },

    findAll: function (){
        return this.getData();
    },

    findByPk: function(id){
       let allUser = this.findAll();
       let userFound = allUser.find(oneUser => oneUser.id === id);
       return userFound;
    },

    findByField: function(field, text){
        let allUser = this.findAll();
        let userFound = allUser.find(oneUser => oneUser[field] === text);  // Buscar el 1er usuerio que cumple con los parametros ingresados. Para buscar todos y no solo uno realizar con filter
        return userFound;
     },

    create: function (userData){
        let allUser = this.findAll();
        let password = bcrypt.hashSync(userData.password,10);
        let newUser = {
            id: this.generateId(),
            ...userData,
            password: password
        }
        delete newUser.confirmPassword;
        
        
        allUser.push(newUser);
        fs.writeFileSync(userFile, JSON.stringify(allUser, null, ' '));
        return true;
         
    },

    delete: function(id) {
        let allUser = this.findAll();
        let finalUsers = allUser.filter(oneUser=> oneUser.id != id)
        fs.writeFileSync(userFile,JSON.stringify(finalUsers, null, ' '));
        return true;
    }
}

module.exports = Users;

 