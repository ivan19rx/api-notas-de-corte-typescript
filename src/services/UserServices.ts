import prismaClient from '../prisma'
import { UserRequest } from '../models/interfaces/UserRequest'
import { json } from 'express'

export class CreateUserService {
    async execute({ nome, email, senha, nivelacesso }: UserRequest) {
        if (!nome) {
            return { erro: true, mensagem: "Digite seu nome" }
        }
        if (!email) {
            return { erro: true, mensagem: "Digite seu email" }
        }
        if (!senha) {
            return { erro: true, mensagem: "Digite sua senha" }
        }

        const userExists = await prismaClient.usuario.findFirst({
            where: {
                email: email
            }
        })

        if (userExists) {
            return { erro: true, mensagem: "Já existe um usuário cadastrado com este email" }
        }

        const nivelAcessoPadrao = nivelacesso || "Cliente"

        try {
            const user = await prismaClient.usuario.create({
                data: {
                    nome: nome,
                    email: email,
                    senha: senha,
                    nivelacesso: nivelAcessoPadrao
                }
            });

            return { erro: false, mensagem: "Usuário criado com sucesso" };
        } catch (error) {
            return { erro: true, mensagem: "Ocorreu um erro ao criar o usuário" };
        }
    }
}

export class DeleteUserService {
    async execute(userId: number) {
        try {
            // Verifica se o usuário existe
            const user = await prismaClient.usuario.findUnique({
                where: {
                    id: userId
                }
            });

            if (!user) {
                return { erro: true, mensagem: "Usuário não encontrado" };
            }

            // Deleta o usuário
            await prismaClient.usuario.delete({
                where: {
                    id: userId
                }
            });

            return { erro: false, mensagem: "Usuário excluído com sucesso" };
        } catch (error) {
            return { erro: true, mensagem: "Ocorreu um erro ao excluir o usuário" };
        }
    }
}


