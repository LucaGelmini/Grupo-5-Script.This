module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }, 
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        mensure_value: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        discount: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        stock: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        exposition_id: dataTypes.BIGINT(10),
        unit_mensure_id: dataTypes.BIGINT(10),
        category_id: dataTypes.BIGINT(10) 
    };
    let config = {
        timestamps: true,
        createdAt: 'create_date',
        updatedAt: 'update_date',
        deletedAt: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = models => {
        Product.belongsToMany(models.CartOrder, {
            as: "cartOrders",
            through: "Order",
            foreignKey: "product_id",
            otherKey: "cart_order_id",
            timestamps: false
        }),
        Product.hasMany(models.Order, {
            as: "orders",
            foreignKey: "product_id"
            // timestamps: true
        }),
        Product.belongsTo(models.UnitMensure, {
            as: "unitMensure",
            foreignKey: "unit_mensure_id"
            // timestamps: false,
            // onDelete: 'CASCADE'
        }),
        Product.belongsTo(models.Exposition, {
            as: "exposition",
            foreignKey: "exposition_id"
            // timestamps: false,
            // onDelete: 'CASCADE'
        }),
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
            // timestamps: false
        })
    }

    return Product
}