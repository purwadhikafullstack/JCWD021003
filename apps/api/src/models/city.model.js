import { Model, DataTypes } from 'sequelize';

export default class City extends Model {
   static associate(models) {
    this.belongsTo(models.Province, { foreignKey: 'provinceId' });
    this.hasMany(models.UserAddress, { foreignKey: 'cityId' });
    this.hasOne(models.Warehouse, { foreignKey: 'cityId' });
  }
}

export const init = (sequelize) => {
  City.init(
    {
      name: DataTypes.STRING,
      provinceId: DataTypes.INTEGER,
      postal_code:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'City',
      timestamps: false,
    },
  );
};