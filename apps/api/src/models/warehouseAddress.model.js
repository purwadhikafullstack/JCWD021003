import { Model, DataTypes } from 'sequelize';

export default class WarehouseAddress extends Model {
  static associate(models) {
    this.hasOne(models.Warehouse, { foreignKey: 'warehouseAddressId' });
    this.belongsTo(models.City, { foreignKey: 'cityId' });
  }
}

export const init = (sequelize) => {
    WarehouseAddress.init(
    {
      location: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      postalCode: DataTypes.INTEGER,
      latitude: DataTypes.DECIMAL(10, 8),
      longitude: DataTypes.DECIMAL(11, 8),
    },
    {
      sequelize,
      modelName: 'WarehouseAddress',
      timestamps: false,
    },
  );
};