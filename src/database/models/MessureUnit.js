module.exports = (sequelize, dataTypes) => {
    let alias = 'MessureUnit';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type:{type: dataTypes.STRING(50)}

    };
    let config = {
        tableName: 'units_mensures',
        timestamps: false 
    };

    const MessureUnit = sequelize.define(alias, cols, config);

    MessureUnit.associate = models =>{
        MessureUnit.hasMany(models.Product, {
            as: "products",
            foreignKey: "unit_mensure_id",
            timestamps: false
        })
    }

    return MessureUnit
}