import { Request, Response } from "express";
import DescricaoUser from "../models/DescricaoUser"
import { CreateDescricaoUserDto } from "../dto/CreateDescricaoUserDto";
import { UpdateDescricaoUserDto } from "../dto/UpdateDescricaoUserDto";

export default class DescricaoUserController {
    static async create(req: Request<CreateDescricaoUserDto>, res: Response): Promise<void> {
        const { descricao, instrumentos, habilidades } = req.body

        if (!descricao) {
            res.status(422).json({ message: "descrição obrigatória" });
            return;
        }

        if (!instrumentos) {
            res.status(422).json({ message: "informe pelo menos um instrumento" })
        }

        if (!habilidades) {
            res.status(422).json({ message: "informe suas habilidades" })
        }

        try {
            await DescricaoUser.create({ descricao, instrumentos, habilidades });

            res.status(201).json({ message: "Descrição criada com sucesso!!!!!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no srv", error });
        }
    }

    static async update(
        req: Request<{ id: string }, {}, UpdateDescricaoUserDto>,
        res: Response): Promise<void> {
        const { id } = req.params
        const { descricao, instrumentos, habilidades } = req.body

        if (!descricao && !instrumentos && !habilidades) {
            res.status(422).json({ message: "Informe os campos para atualizar." });
            return;
        }

        try {
            const descricaoUser = await DescricaoUser.findByPk(id);

            if (!descricaoUser) {
                res.status(404).json({ message: "banda não encontrada" });
                return;
            }

            await descricaoUser.update({ descricao, instrumentos, habilidades });

            res.status(200).json({ message: "Alteração feita com sucesso", descricaoUser });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }


    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const { id } = req.params;

            const descricaoUser = await DescricaoUser.destroy({ where: { id: id } });

            res.status(200).json({ descricaoUser });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async getall(req: Request<CreateDescricaoUserDto>, res: Response): Promise<void> {
        try {
            var descricaoUser = await DescricaoUser.findAll();

            res.status(201).json({ descricaoUser: descricaoUser });
        } catch (error) {

        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const descricaoUser = await DescricaoUser.findByPk(Number(id));

            res.status(200).json({ descricaoUser });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async consulta(req: Request<CreateDescricaoUserDto>, res: Response): Promise<void> {
        const { descricao, instrumento, habilidades } = req.body

        try {
            var descricaoUser = await DescricaoUser.findAll({ where: { descricao: "descricaoUser" } });

            res.status(201).json({ descricaoUsers: descricaoUser });
        } catch (error) {

        }
    }
}