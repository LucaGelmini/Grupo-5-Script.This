module.exports = (sequelize, dataTypes) => {
    let alias = 'Exposition';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        type:{
            type: dataTypes.STRING(50),
            allowNull: false}

    };
    let config = {
        timestamps: false
    };

    const Exposition = sequelize.define(alias, cols, config);

    Exposition.associate = models => {
        Exposition.hasMany(models.Product, {
            as: "products",
            foreignKey: "exposition_id"
        })
    }

    return Exposition
}