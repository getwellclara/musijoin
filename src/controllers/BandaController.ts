import { Request, Response } from "express";
import { CreateBandaDto } from "../dto/CreateBandaDto";
import Banda from "../models/Banda"
import { UpdateBandaDto } from "../dto/UpdateBanda";

export default class BandaController {
    static async create(req: Request<CreateBandaDto>, res: Response): Promise<void> {
        const { nome, numeroIntegrantes, integrantes, descricaoBanda } = req.body;

        if (!nome) {
            res.status(422).json({ message: "infome o nome da banda" })
        }

        if (!numeroIntegrantes) {
            res.status(422).json({ message: "informe o número de integrantes" })
        }

        if (!integrantes) {
            res.status(422).json({ message: "informe os integrantes" })
        }

        if (!descricaoBanda) {
            res.status(422).json({ message: "defina uma descrição" })
        }

        try {
            await Banda.create({ nome, numeroIntegrantes, integrantes, descricaoBanda });

            res.status(201).json({ message: "Banda criado com sucesso!!!!!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no srv", error });
        }
    }

    static async update(
        req: Request<{ id: string }, {}, UpdateBandaDto>,
        res: Response): Promise<void> {
        const { id } = req.params;
        const { nome, numeroIntegrantes, integrantes, descricaoBanda } = req.body;

        if (!nome && !numeroIntegrantes && !integrantes && !descricaoBanda) {
            res.status(422).json({ message: "Informe os campos para atualizar." });
            return;
        }

        try {
            const banda = await Banda.findByPk(id);

            if (!banda) {
                res.status(404).json({ message: "Banda não encontrada" });
                return;
            }

            await banda.update({ nome, numeroIntegrantes, integrantes, descricaoBanda });

            res.status(200).json({ message: "Banda atualizada com sucesso!", banda });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const { id } = req.params;

            const banda = await Banda.destroy({ where: { id: id } });

            res.status(200).json({ banda });
        } catch (error) {

        }

    }

    static async getall(req: Request<CreateBandaDto>, res: Response): Promise<void> {
        try {
            var bandas = await Banda.findAll();

            res.status(201).json({ bandas: bandas });
        } catch (error) {

        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const banda = await Banda.findByPk(Number(id));

            res.status(200).json({ banda });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async consulta(req: Request<CreateBandaDto>, res: Response): Promise<void> {
        const { nome, numeroIntegrantes, integrantes, descricaoBanda } = req.body;

        try {
            var bandas = await Banda.findAll({ where: { nome: "banda" } });

            res.status(201).json({ bandas: bandas });
        } catch (error) {

        }
    }
}
