import { Model, DataTypes } from 'sequelize';

export default class Categories extends Model {

    static associate(models) {
        this.hasMany(models.Products, { foreignKey: 'category_id'})
    }
}

export const init = (sequelize) => {
    Categories.init(
        {
            name: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isAlpha: true,
                },
            },
            image: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Categories',
        },
    );
};