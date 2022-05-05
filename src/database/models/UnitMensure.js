module.exports = (sequelize, dataTypes) => {
    let alias = 'UnitMensure';
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
        tableName: 'units_mensures',
        timestamps: false 
    };

    const UnitMensure = sequelize.define(alias, cols, config);

    UnitMensure.associate = models =>{
        UnitMensure.hasMany(models.Product, {
            as: "products",
            foreignKey: "unit_mensure_id" 
        })
    }

    return UnitMensure
}