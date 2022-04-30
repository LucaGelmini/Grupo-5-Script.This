module.exports = (sequelize, dataTypes) => {
    let alias = 'CartOrder';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: {type: dataTypes.FLOAT},
        quantityOfItems: {
            type: dataTypes.INTEGER,
            field: 'product_quantity'    
        },
        cartOrderId: {
            type: dataTypes.INTEGER,
            field: 'cart_order_id'    
        },
        productId: {
            type: dataTypes.INTEGER,
            field: 'product_id'    
        },
        createdAt:{
            type: dataTypes.DATE,
            field: 'create_date'
        },
        updatedAt: {
            type: dataTypes.DATE,
            field: 'update_date',
         },
         canceledAt:{
            type: dataTypes.DATE,
            field: 'cancel_date'
        }

    };
    let config = {
        tableName: 'orders',
        timestamps: true
    };

    const CartOrder = sequelize.define(alias, cols, config);

    return CartOrder
}