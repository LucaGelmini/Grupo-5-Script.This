module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{type: dataTypes.STRING(50)}

    };
    let config = {
        tableName: 'categories',
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = models =>{
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id",
            timestamps: false
        })
    }

    return Category
}