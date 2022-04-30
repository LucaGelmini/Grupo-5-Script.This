module.exports = (sequelize, dataTypes) => {
    let alias = 'CartOrder';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: {type: dataTypes.FLOAT},
        userId: {
            type: dataTypes.INTEGER,
            field: 'user_id'    
        },
        paymentId: {
            type: dataTypes.INTEGER,
            field: 'payment_id'    
        },
        statusId: {
            type: dataTypes.INTEGER,
            field: 'status_id'    
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
        },
        confirmedAt: {
            type: dataTypes.DATE,
            field: 'confirm_date',
         },


    };
    let config = {
        tableName: 'carts_orders',
        timestamps: true
    };

    const CartOrder = sequelize.define(alias, cols, config);

    return CartOrder
}