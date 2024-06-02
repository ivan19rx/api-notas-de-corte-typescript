import prismaClient from '../prisma'
import { UserRequest } from '../models/interfaces/UserRequest'

export class CreateUserService {
    async execute({nome, email, senha, nivelacesso}: UserRequest) {
        if(!nome) {
            throw new Error("Digite o nome")
        }
        if(!email) {
            throw new Error("Digite seu email")
        }

        const userExists = await prismaClient.usuario.findFirst({where: {
            email: email
        }})

        if (userExists) {
            throw new Error("já exise um usuário cadastrado com esse email")
        }

        const nivelAcessoPadrao = nivelacesso || "Cliente"

        


        const user = prismaClient.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senha,
                nivelacesso: nivelAcessoPadrao
            }
        })

        return user
    }
}