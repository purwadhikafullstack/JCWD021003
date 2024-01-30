import { Model, DataTypes } from 'sequelize';

export default class UserAddress extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.belongsTo(models.City, { foreignKey: 'cityId' });
    this.hasMany(models.Orders, { foreignKey: 'userAddressId' });
  }
}

export const init = (sequelize) => {
  UserAddress.init(
    {
      specificAddress: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      isMainAddress: DataTypes.BOOLEAN,
      postalCode: DataTypes.INTEGER,
      latitude: DataTypes.DECIMAL(10, 8),
      longitude: DataTypes.DECIMAL(11, 8),
    },
    {
      sequelize,
      modelName: 'UserAddress',
      timestamps: true,
      paranoid: true, 
    },
  );
};