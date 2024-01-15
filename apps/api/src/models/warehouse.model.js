import { Model, DataTypes } from 'sequelize';

export default class Warehouse extends Model {
   static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.hasMany(models.City, { foreignKey: 'cityId' });
    this.hasMany(models.Orders, { foreignKey: 'warehouseId' });
  }
}

export const init = (sequelize) => {
  Warehouse.init(
    {
      address: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Warehouse',
      timestamps: false,
    },
  );
};