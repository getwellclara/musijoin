import { Router } from "express";
import DescricaoUserController from "../controllers/DescricaoUserController";

const router = Router();

router.post("/create", DescricaoUserController.create);
router.put("/update", DescricaoUserController.update);
router.get("/getAll", DescricaoUserController.getall);
router.get("/consulta", DescricaoUserController.consulta);
router.get("/getById:id", DescricaoUserController.getById);
router.delete("/delete", DescricaoUserController.delete);

export default router 
