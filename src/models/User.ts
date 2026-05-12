import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/conn";
import { IUser } from "../interfaces/IUser"

type UserCreationAttributes = Optional<IUser, "id">;

class User extends Model<IUser, UserCreationAttributes>
    implements IUser {
    public id!: number;
    public nome!: string;
    public sobrenome!: string;
    public idade!: number;
    public email!: string;
}

User.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sobrenome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idade: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize: db,
        tableName: "User"
    }
);

export default User;
