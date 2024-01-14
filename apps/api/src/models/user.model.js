import { Model, DataTypes } from 'sequelize';

export default class User extends Model {

    static associate(models) {
        this.belongsTo(models.Role, { foreignKey: 'roleId' });
        this.hasMany(models.UserAddress, {foreignkey: 'userId'});
        this.hasMany(models.Carts, {foreignKey: 'userId'});
        this.hasMany(models.Orders, {foreignKey: 'userId'})
    }
}

export const init = (sequelize) => {
    User.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            roleId: DataTypes.INTEGER,
            isVerified: DataTypes.BOOLEAN,
            avatar: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
            timestamps: false,
        },
    );
};
