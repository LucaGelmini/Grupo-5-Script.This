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

    CartOrder.associate = models => {
        CartOrder.belongsToMany(models.Product, {
            as: "product",
            through: "orders",
            foreignKey: "cart_order_id",
            otherKey: "product_id",
            timestamps: false
        }),
        CartOrder.hasMany(models.Order, {
            as: "CO_to_orders",
            foreignKey: "cart_order_id",
            timestamps: true,
            onDelete: 'CASCADE'
        }),
        CartOrder.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id",
            timestamps: true
        }),
        CartOrder.belongsTo(models.Payment, {
            as: "payments",
            foreignKey: "payment_id",
            timestamps: false
        }),
        CartOrder.belongsTo(models.Status, {
            as: "status",
            foreignKey: "status_id",
            timestamps: false
        })
    }
    return CartOrder
}