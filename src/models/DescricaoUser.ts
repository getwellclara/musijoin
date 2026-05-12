import { DataTypes, Model, Optional} from "sequelize";
import db from "../db/conn";
import { IDescricaoUser } from "../interfaces/IUser";

type DescricaoUserCreationAttributes = Optional <IDescricaoUser, "id">;

class DescricaoUser extends Model<IDescricaoUser, DescricaoUserCreationAttributes>
    implements IDescricaoUser {
        descricao!: string;
        instrumentos!: string;
        habilidades!: string;
}

DescricaoUser.init(
    {
        descricao:{
            type: DataTypes.STRING,
            allowNull: true
        },
        instrumentos:{
            type: DataTypes.STRING,
            allowNull: false
        },
        habilidades:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
      {
        sequelize: db,
        tableName: "DescricaoUser"
    }
);

export default DescricaoUser;
