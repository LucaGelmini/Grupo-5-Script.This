module.exports = (sequelize, dataTypes) => {
    let alias = 'CartOrder';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }, 
        total: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        cancel_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        confirm_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        user_id: dataTypes.BIGINT(10),
        payment_id: dataTypes.BIGINT(10),
        status_id: dataTypes.BIGINT(10) 
    };

    let config = {
        timestamps: true,
        createdAt: 'create_date',
        updatedAt: 'update_date',
        deletedAt: false,
        tableName: 'carts_orders'
    };

    const CartOrder = sequelize.define(alias, cols, config);

    CartOrder.associate = models => {
        CartOrder.belongsToMany(models.Product, {
            as: "product",
            through: "Order",
            foreignKey: "cart_order_id",
            otherKey: "product_id",
            timestamps: false
        }),
        /*
        CartOrder.hasMany(models.Order, {
            as: "orders",
            foreignKey: "cart_order_id"
            // timestamps: true,
            // onDelete: 'CASCADE'
        }),
        */
        CartOrder.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
            // timestamps: true
        }),
        CartOrder.belongsTo(models.Payment, {
            as: "payment",
            foreignKey: "payment_id"
            // timestamps: false
        }),
        CartOrder.belongsTo(models.Status, {
            as: "status",
            foreignKey: "status_id"
            // timestamps: false
        })
    }
    return CartOrder
}