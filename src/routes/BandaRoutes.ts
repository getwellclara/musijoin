import { Router } from "express";
import BandaController from "../controllers/BandaController";

const router = Router();

router.post("/create", BandaController.create);
router.put("/update", BandaController.update);
router.get("/getAll", BandaController.getall);
router.get("/consulta", BandaController.consulta);
router.get("/getById:id", BandaController.getById);
router.delete("/delete", BandaController.delete);

export default router 

