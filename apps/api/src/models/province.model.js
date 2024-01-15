import { Model, DataTypes } from 'sequelize';

export default class Province extends Model {
    static associate(models) {
    this.hasMany(models.City, { foreignKey: 'provinceId' });
  }
}

export const init = (sequelize) => {
  Province.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Province',
      timestamps: false,
    },
  );
};