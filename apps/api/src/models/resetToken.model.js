import { Model, DataTypes } from 'sequelize';

export default class ResetToken extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

export const init = (sequelize) => {
  ResetToken.init(
    {
      token: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      isUsed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'ResetToken',
      timestamps: false,
    },
  );
};
