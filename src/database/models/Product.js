module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {type: dataTypes.STRING(50)},
        image: {type: dataTypes.STRING(50)},
        description: {type: dataTypes.TEXT},
        quantity: {
            type: dataTypes.INTEGER,
            field: 'mensure_value'    
        },
        discount: {type: dataTypes.INTEGER},
        stock: {type: dataTypes.INTEGER},
        price: {type: dataTypes.FLOAT},
        createdAt:{
            type: dataTypes.DATE,
            field: 'create_date'
        },
        updatedAt: {
            type: dataTypes.DATE,
            field: 'update_date',
         },
         expositionId: {
             type: dataTypes.INTEGER,
              field: 'exposition_id'},
        messureUnitsId: {
            type: dataTypes.INTEGER,
            field: 'unit_mensure_id'
        },
        categoryId: {
            type: dataTypes.INTEGER,
            field: 'category_id'
        },


    };
    let config = {
        tableName: 'products',
        timestamps: true
    };

    const Product = sequelize.define(alias, cols, config);

    return Product
}