import prismaClient from '../prisma'
import { LoginRequest } from '../models/interfaces/AuthRequests'
import jwt from 'jsonwebtoken'
require('dotenv').config()

export class LoginService {
    async execute({email, senha}: LoginRequest) {
        
        if (!email || !senha) {
            return {
                erro: true,
                msg: "Erro: Todos os campos devem ser preenchidos!"
            }
        }

        const usuario = await prismaClient.usuario.findFirst({
            where: {
                email: email
            }
        })

        if (!usuario) {
            return{
                erro: true,
                msg: "Erro: Email ou senha incorretos"
            }
        }

        if (senha != usuario.senha) {
            return {
                erro: true,
                msg: "Erro: Email ou senha incorretos"
            }
        }

        try {
            const secret: string = process.env.SECRET || '';
            const token = jwt.sign({
                id: usuario.id,
                nome: usuario.nome,
                nivelAcesso: usuario.nivelacesso
            }, secret)

            const user = {
                id: usuario.id,
                nome: usuario.nome,
                nivelacesso: usuario.nivelacesso
            }

            return { msg: "autenticado com sucesso", token, user }

        } catch (error) {
            console.log(error)

            return {
                msg: "ocorreu um erro no servidor"
            }
        }

    }
}

