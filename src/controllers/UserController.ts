import { Request, Response } from "express";
import User from "../models/User";
import { CreateUserDto } from "../dto/CreateUserDto";

export default class UserController {

    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const { id } = req.params;

            const user = await User.destroy({ where: { id: id } });

            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async consulta(req: Request<CreateUserDto>, res: Response): Promise<void> {
        const { nome, sobrenome, idade, email } = req.body;

        try {
            var users = await User.findAll({ where: { nome: "nome" } });

            res.status(201).json({ users: users });
        } catch (error) {

        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const user = await User.findByPk(Number(id));

            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async getall(req: Request<CreateUserDto>, res: Response): Promise<void> {
        try {
            var users = await User.findAll();

            res.status(201).json({ users: users });
        } catch (error) {

        }
    }

    static async create(req: Request<CreateUserDto>, res: Response): Promise<void> {
        const { nome, sobrenome, idade, email } = req.body;

        if (!nome) {
            res.status(422).json({ message: "nome obrigatório" });
            return;
        }

        if (!sobrenome) {
            res.status(422).json({ message: "nome obrigatório" });
            return;
        }

        if (!idade) {
            res.status(422).json({ message: "idade obrigatório!" });
            return;
        }

        if (!email) {
            res.status(422).json({ message: "email obrigatório!" });
            return;
        }

        try {
            await User.create({ nome, sobrenome, idade, email });

            res.status(201).json({ message: "Aluno criado com sucesso!!!!!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no srv", error });
        }
    }
}

