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

    Product.associate = models => {
        Product.belongsToMany(models.CartOrder, {
            as: "cartOrders",
            through: "orders",
            foreignKey: "product_id",
            otherKey: "cart_order_id",
            timestamps: false
        }),
        Product.hasMany(models.Order, {
            as: "P_to_orders",
            foreignKey: "product_id",
            timestamps: true
        }),
        Product.belongsTo(models.MessureUnit, {
            as: "messureUnits",
            foreignKey: "unit_mensure_id",
            timestamps: false,
            onDelete: 'CASCADE'
        }),
        Product.belongsTo(models.Exposition, {
            as: "exposition",
            foreignKey: "exposition_id",
            timestamps: false,
            onDelete: 'CASCADE'
        }),
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id",
            timestamps: false
        })
    }

    return Product
}