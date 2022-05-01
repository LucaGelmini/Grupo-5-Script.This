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

    return MessureUnit
}