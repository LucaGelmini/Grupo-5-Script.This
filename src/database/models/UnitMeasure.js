module.exports = (sequelize, dataTypes) => {
    let alias = 'unit_measures';
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
        tableName: 'units_measures',
        timestamps: false 
    };

    const UnitMeasure = sequelize.define(alias, cols, config);

    UnitMeasure.associate = models =>{
        UnitMeasure.hasMany(models.Product, {
            as: "products",
            foreignKey: "unit_measure_id" 
        })
    }

    return UnitMeasure
}