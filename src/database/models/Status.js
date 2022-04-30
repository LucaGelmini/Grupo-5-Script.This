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

    return Status
}