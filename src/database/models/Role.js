module.exports = (sequelize, dataTypes) => {
    let alias = 'roles';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        } 
    };

    let config = {
        timestamps: false 
    };

    const Role = sequelize.define(alias, cols, config);

    Role.associate = models => {
        Role.hasMany(models.User, {
            as: "users",
            foreignKey: "role_id"
            // timestamps: false
        })
    }

    return Role
}