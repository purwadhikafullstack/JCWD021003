import { Model, DataTypes } from 'sequelize';

export default class Warehouse extends Model {
   static associate(models) {
    this.hasMany(models.User, { foreignKey: 'warehouseId' });
    this.belongsTo(models.WarehouseAddress, { foreignKey: 'warehouseAddressId' });
    this.hasMany(models.Orders, { foreignKey: 'warehouseId' });
  }
}

export const init = (sequelize) => {
  Warehouse.init(
    {
      name: DataTypes.STRING,
      warehouseAddressId: DataTypes.INTEGER, 
    },
    {
      sequelize,
      modelName: 'Warehouse',
      timestamps: false,
    },
  );
};