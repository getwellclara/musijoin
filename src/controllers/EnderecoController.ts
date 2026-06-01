import { Request, Response } from "express";
import Endereco from "../models/Endereco";
import { CreateEnderecoDto } from "../dto/CreateEnderecoDto";
import { UpdateEnderecoDto } from "../dto/UpdateEnderecoDto";

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
    static async update(
        req: Request<{ id: string }, {}, UpdateEnderecoDto>,
        res: Response): Promise<void> {
        const { id } = req.params
        const { logradouro, numero, bairro, cidade, estado } = req.body

        if (!logradouro && !numero && !bairro && !cidade && !estado) {
            res.status(422).json({ message: "Informe os campos para atualizar." });
            return;
        }

        try {
            const endereco = await Endereco.findByPk(id);

            if (!endereco) {
                res.status(402).json({ message: "Endereço não encontrado." });
                return;
            }

            await endereco.update({ logradouro, numero, bairro, cidade, estado });

            res.status(200).json({ message: "Endereço atualizado com sucesso!", endereco });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor", error });
        }
    }


    static async consulta(req: Request<CreateEnderecoDto>, res: Response): Promise<void> {
        const { logradouro, numero, bairro, cidade, estado } = req.body;

        try {
            var enderecos = await Endereco.findAll({ where: { logradouro: "logradouro" } });

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
        const { logradouro, numero, bairro, cidade, estado } = req.body;

        if (!logradouro) {
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
            res.status(422).json({ message: "informe o estado" });
        }

        try {
            await Endereco.create({ logradouro, numero, bairro, cidade, estado });

            res.status(201).json({ message: "Endereço criado com sucesso!!!!!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no srv", error });
        }
    }
}