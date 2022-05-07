module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fullname: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        username: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        brithdate: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        adress: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        postalcode: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        phone: {
            type: dataTypes.STRING(15),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        userfile: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        role_id: dataTypes.BIGINT(10) 
    };

    let config = {
        timestamps: true,
        createdAt: 'create_date',
        updatedAt: 'update_date',
        deletedAt: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = models => {
        User.hasMany(models.CartOrder, {
            as: "cartsOrders",
            foreignKey: "user_id"
            // timestamps: true,
            // onDelete: "CASCADE"
        }),
        User.belongsTo(models.Role,{
            as: "role",
            foreignKey: "role_id"
            // timestamps: false
        })
    }

    return User
}