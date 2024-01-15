import { Model, DataTypes } from 'sequelize';

export default class Carts extends Model {
   static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

export const init = (sequelize) => {
  Carts.init(
    {
      userId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      totalQuantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Carts',
    },
  );
};