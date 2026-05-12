import { DataTypes, Model, Optional} from "sequelize";
import db from "../db/conn";
import { IEndereco } from "../interfaces/IUser"


type EnderecoCreationAttributes = Optional <IEndereco, "id" >;

class Endereco extends Model<IEndereco, EnderecoCreationAttributes>
    implements IEndereco {;
        endereco!: string;
        numero!: number;
        bairro!: string;
        cidade!: string;
        estado!: string;
}

Endereco.init(
    {
        endereco:{
            type: DataTypes.STRING,
            allowNull: false
        },
        numero:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        bairro:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado:{
            type: DataTypes.STRING,
            allowNull: false
        },
    },
      {
        sequelize: db,
        tableName: "Endereco"
    }
);

export default Endereco;