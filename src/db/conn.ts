import { Sequelize } from "sequelize"; 

const sequelize = new Sequelize(
    "musijoin",
    "root",
    "musijoin@2026",
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conectado com sucesso!")
    } catch (err) {
        console.log("Erro ao conectar ao banco: ", err)
    }
})();

export default sequelize;