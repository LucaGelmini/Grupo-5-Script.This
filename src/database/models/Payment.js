module.exports = (sequelize, dataTypes) => {
    let alias = 'Payment';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        method: {
            type: dataTypes.STRING(50),
            allowNull: false
        } 
    };

    let config = {
        timestamps: false 
    };

    const Payment = sequelize.define(alias, cols, config);

    Payment.associate = models => {
        Payment.hasMany(models.CartOrder, {
            as: "cartsOrders",
            foreignKey: "payment_id",
            tableName: 'payments'
        })
    }

    return Payment
}