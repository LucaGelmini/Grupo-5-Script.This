module.exports = (sequelize, dataTypes) => {
    let alias = 'Status';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{type: dataTypes.STRING(50)}

    };
    let config = {
        tableName: 'statuss',
        timestamps: false
    };

    const Status = sequelize.define(alias, cols, config);

    Status.associate = models => {
        Status.hasMany(models.CartOrder, {
            as: "cartOrders",
            foreignKey: "status_id"
        })
    }

    return Status
}