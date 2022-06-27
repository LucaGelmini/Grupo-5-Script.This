module.exports = (sequelize, dataTypes) => {
    let alias = 'categories';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: dataTypes.STRING(50),
            allowNull: false}

    };
    let config = {
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = models =>{
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id" 
        })
    }

    return Category
}