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

    return Exposition
}