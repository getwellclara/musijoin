import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkToken } from "../middleware/auth";

const router = Router();

router.post("/create",UserController.create);
router.post("/login", checkToken, UserController.login);
router.put("/update", checkToken, UserController.update);
router.get("/getAll", UserController.getall);
router.get("/consulta", UserController.consulta);
router.get("/getById:id", UserController.getById);
router.delete("/delete:id", UserController.delete);

export default router