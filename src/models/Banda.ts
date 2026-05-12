import { DataTypes, Model, Optional} from "sequelize";
import db from "../db/conn";
import { IBanda } from "../interfaces/IUser"


type BandaCreationAttributes = Optional <IBanda, "id">;

class Banda extends Model<IBanda, BandaCreationAttributes>
    implements IBanda {
        idBanda!: number;
        numeroIntegrantes!: number;
        integrantes!: string;
        descricaoBanda!: string;
}

Banda.init(
    {
        numeroIntegrantes:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        integrantes:{
            type: DataTypes.STRING,
            allowNull: false
        },
        descricaoBanda: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
      {
        sequelize: db,
        tableName: "Banda"
    }
);

export default Banda;

