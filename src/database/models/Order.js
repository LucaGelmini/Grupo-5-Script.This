module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // create_date: dataTypes.TIMESTAMP,
        // update_date: dataTypes.TIMESTAMP,
        product_quantity: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        total: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        cancel_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        cart_order_id: {
            type: dataTypes.BIGINT(10),
            references: {
                model: 'CartOrder'
            }
        },
        product_id: {
            type: dataTypes.BIGINT(10),
            references: {
                model: 'Product'
            }
        }
    };

    let config = {
        timestamps: true,
        createdAt: 'create_date',
        updatedAt: 'update_date',
        deletedAt: false
    };

    const Order = sequelize.define(alias, cols, config);

    Order.associate = models => {
        Order.belongsTo(models.Product,{
            as: "product",
            foreignKey: "product_id"
            // timestamps: true
        }),
        Order.belongsTo(models.CartOrder, {
            as: "cartOrder",
            foreignKey: "cart_order_id"
            // timestamps: true
        })
    }
    return Order
}