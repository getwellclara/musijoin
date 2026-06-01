import express, { Application } from "express";
import cors from "cors";
import db from "./db/conn";
import UserRoutes from "./routes/UserRoutes";
import EnderecoRoutes from "./routes/EnderecoRoutes";
import DescricaoUserRoutes from "./routes/DescricaoUserRoutes";
import BandaRoutes from "./routes/BandaRoutes"

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use ("/user", UserRoutes);
app.use ("/endereco", EnderecoRoutes);
app.use ("/descricaoUser", DescricaoUserRoutes);
app.use ("./bandas", BandaRoutes);

db.sync()
    .then(() => {
        app.listen(5000, () => {
            console.log("Servidor online!");
        })
    })
    .catch((er: Error) => console.log("erro ao sincronizar"));