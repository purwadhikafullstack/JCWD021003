import { Model, DataTypes } from 'sequelize';

export default class Orders extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.belongsTo(models.UserAddress, { foreignKey: 'userAddressId' });
    this.belongsTo(models.Warehouse, { foreignKey: 'warehouseId' });
    this.belongsTo(models.OrderStatuses, { foreignKey: 'orderStatusId' });
  }
}

export const init = (sequelize) => {
  Orders.init(
    {
      userId: DataTypes.INTEGER,
      userAddressId: DataTypes.INTEGER,
      warehouseId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      totalQuantity: DataTypes.INTEGER,
      shippingCost: DataTypes.DECIMAL,
      orderDate: DataTypes.DATE,
      orderStatusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      createdAt: 'orderDate',
      updatedAt: false,
      modelName: 'Orders',
    },
  );
};