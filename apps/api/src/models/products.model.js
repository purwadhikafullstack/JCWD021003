import { Model, DataTypes } from 'sequelize';

export default class Products extends Model {

  static associate(models) {

  }
}

export const init = (sequelize) => {
  Products.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      size_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      category_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Products',
    },
  );
};