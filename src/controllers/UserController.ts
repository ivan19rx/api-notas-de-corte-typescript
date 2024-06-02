import { CreateUserService, DeleteUserService, EditUserService,  } from "../services/UserServices";
import { Request, Response } from "express";
import { UserRequest } from "../models/interfaces/UserRequest";
import prismaClient from "../prisma";





export class CreateUser {
    async handle(req: Request, res: Response) {
        const { nome, email, senha, nivelacesso }: UserRequest = req.body
        const createUserService = new CreateUserService
        const user = await createUserService.execute({
            nome, email, senha, nivelacesso
        })

        return res.json(user)
    }
}

export class DeleteUser {
    async handle(req: Request, res: Response) {
        const id = parseInt(req.params.id)

        const deleteUserService = new DeleteUserService
        const deleteUser = await deleteUserService.execute(id)

        return res.json(deleteUser)
    }
}

export class ListUsers {
    async handle(req: Request, res: Response) {
        const usuarios = await prismaClient.usuario.findMany()

        if (usuarios.length === 0) {
            return res.json({ msg: "Não há usuarios cadastrados" })
        }

        return res.json({erro: false, data: usuarios})
    }
}

export class GetUserById {
    async handle(req: Request, res: Response) {

        const id = parseInt(req.params.id)
        
        const user = await prismaClient.usuario.findFirst({
            where: {
                id: id
            }
        })

        if(!user) {
            return res.json({erro: true, msg: "falha ao buscar usuário"})
        }

        return res.json(user)

        
    }
}

export class EditUser {
    async handle(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const data = req.body

        const editUserService = new EditUserService
        const userEdit = await editUserService.execute(id, data)

        return res.json(userEdit)
    }
}