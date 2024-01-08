import { Model, DataTypes } from 'sequelize';

export default class Role extends Model {

    static associate(models) {
        this.hasMany(models.User, { foreignKey: 'roleId' });
    }
}

export const init = (sequelize) => {
    Role.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Role',
            timestamps: false,
        },
    );
};
