module.exports = (sequelize, dataTypes) => {
    let alias = 'Exposition';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type:{type: dataTypes.STRING(50)}

    };
    let config = {
        tableName: 'expositions',
        timestamps: false
    };

    const Exposition = sequelize.define(alias, cols, config);

    Exposition.associate = models => {
        Exposition.hasMany(models.Product, {
            as: "CO_to_orders",
            foreignKey: "exposition_id",
            timestamps: true,
        })
    }

    return Exposition
}