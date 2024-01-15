import { Model, DataTypes } from 'sequelize';

export default class OrderStatuses extends Model {
  static associate(models) {
    this.hasMany(models.Orders, { foreignKey: 'orderStatusId' });
  }
}

export const init = (sequelize) => {
  OrderStatuses.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'OrderStatuses',
    },
  );
};