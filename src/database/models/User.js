module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: {type: dataTypes.STRING(50)},
        username: {type: dataTypes.STRING(50)},
        email: {type: dataTypes.STRING(50)},
        brithdate: {type: dataTypes.DATE},
        adress: {type: dataTypes.STRING(50)},
        postalcode: {type: dataTypes.STRING(50)},
        phone: {type: dataTypes.STRING(50)},
        password: {type: dataTypes.STRING(50)},
        userfile: {type: dataTypes.STRING(50)},
        createdAt:{
            type: dataTypes.DATE,
            field: 'create_date'
        },
        updatedAt: {
            type: dataTypes.DATE,
            field: 'update_date',
         },
         role_id: {type: dataTypes.INTEGER}

    };
    let config = {
        tableName: 'users',
        timestamps: true
    };

    const User = sequelize.define(alias, cols, config);

    return User
}