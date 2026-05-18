import { Request, Response } from "express";
import Endereco from "../models/Endereco";
import { CreateEnderecoDto } from "../dto/CreateEnderecoDto";

export default class EnderecoController {

    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const { id } = req.params;

            const endereco = await Endereco.destroy({ where: { id: id } });

            res.status(200).json({ endereco });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async consulta(req: Request<CreateEnderecoDto>, res: Response): Promise<void> {
        const { endereco, numero, bairro, cidade, estado } = req.body;

        try {
            var enderecos = await Endereco.findAll({ where: { endereco: "endereco" } });

            res.status(201).json({ enderecos: enderecos });
        } catch (error) {

        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const endereco = await Endereco.findByPk(Number(id));

            res.status(200).json({ endereco });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async getall(req: Request<CreateEnderecoDto>, res: Response): Promise<void> {
        try {
            var enderecos = await Endereco.findAll();

            res.status(201).json({ enderecos: enderecos });
        } catch (error) {

        }
    }

    static async create(req: Request<CreateEnderecoDto>, res: Response): Promise<void> {
        const { endereco, numero, bairro, cidade, estado } = req.body;

        if (!endereco) {
            res.status(422).json({ message: "endereço obrigatório" });
            return;
        }

        if (!numero) {
            res.status(422).json({ message: "informe um numero" });
            return;
        }

        if (!bairro) {
            res.status(422).json({ message: "informe um bairro" });
            return;
        }

        if (!cidade) {
            res.status(422).json({ message: "informe a cidade" });
            return;
        }

        if (!estado) {
            res.status(422).json({ message: "informe o estado"});
        }

        try {
            await Endereco.create({ endereco, numero, bairro, cidade, estado });

            res.status(201).json({ message: "Endereço criado com sucesso!!!!!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no srv", error });
        }
    }
}