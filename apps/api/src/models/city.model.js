import { Model, DataTypes } from 'sequelize';

export default class City extends Model {
   static associate(models) {
    this.belongsTo(models.Province, { foreignKey: 'provinceId' });
    this.hasMany(models.UserAddress, { foreignKey: 'cityId' });
    this.hasMany(models.Warehouse, { foreignKey: 'cityId' });
  }
}

export const init = (sequelize) => {
  City.init(
    {
      name: DataTypes.STRING,
      provinceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'City',
      timestamps: false,
    },
  );
};