module.exports = (sequelize, dataTypes) => {
    let alias = 'status';
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
        } 
    };

    let config = {
        timestamps: false ,
        tableName: "status"
    };

    const Status = sequelize.define(alias, cols, config);

    Status.associate = models => {
        Status.hasMany(models.CartOrder, {
            as: "cartsOrders",
            foreignKey: "status_id"
        })
    }

    return Status
}