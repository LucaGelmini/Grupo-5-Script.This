module.exports = (sequelize, dataTypes) => {
    let alias = 'Payment';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        method:{type: dataTypes.STRING(50)}

    };
    let config = {
        tableName: 'payments',
        timestamps: false
    };

    const Payment = sequelize.define(alias, cols, config);

    Payment.associate = models => {
        Payment.hasMany(models.CartOrder, {
            as: "cartOrders",
            foreignKey: "payment_id"
        })
    }

    return Payment
}