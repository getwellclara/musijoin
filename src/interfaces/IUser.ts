export interface IUser{
    id? : number;
    nome: string;
    sobrenome: string;
    idade: number,
    email: string;
}

export interface IEndereco {
    id?: string;
    endereco: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
}

export interface IDescricaoUser {
    id?: number;
    descricao: string;
    instrumentos: string;
    habilidades: string;
}

export interface IBanda {
    id?: number;
    nome: string;
    numeroIntegrantes: number;
    integrantes: string;
    descricaoBanda: string;
}

