import { Request, Response } from "express";
import User from "../models/User";
import { CreateUserDto } from "../dto/CreateUserDto";
import { UpdateUserDto } from "../dto/UpdateUserDto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
        const { nome, sobrenome, idade, email, senha } = req.body;

        const salt = await bcrypt.genSalt(10);

        const senhaHash = await bcrypt.hash(
            senha,
            salt
        );

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

        if (!senha) {
            res.status(422).json({ message: "senha obrigatória!" });
        }

        try {
            await User.create({ nome, sobrenome, idade, email, senha: senhaHash });

            res.status(201).json({ message: "Aluno criado com sucesso!!!!!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no srv", error });
        }
    }

    static async update(
        req: Request<{ id: string }, {}, UpdateUserDto>,
        res: Response): Promise<void> {
        const { id } = req.params;
        const { nome, sobrenome, idade, email } = req.body;

        if (!nome && !sobrenome && !idade && !email) {
            res.status(422).json({ message: "Informe os campos para atualizar." });
            return;
        }
        try {
            const user = await User.findByPk(id);

            if (!user) {
                res.status(404).json({ message: "Usuário não encontrado." });
                return;
            }

            await user.update({ nome, sobrenome, idade, email });

            res.status(200).json({ message: "Usuaário atualizado com sucesso", user });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor.", error })
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        const { email, senha } = req.body;

        try {
            const user = await User.findOne({
                where: { email }
            })

            if (!user) {
                res.status(404).json({message: "Usuário não encontrado"});
                return; 
            }

            const senhaValida = await bcrypt.compare(
                senha,
                user.senha
            );

            if (!senhaValida){
                res.status(401).json({message: "Senha inválida"});
            }

            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "1d"
                }
            );
            
            res.status(200).json({message: "Login realizado com sucesso", token})

        } catch (error){

        }
    }
}

