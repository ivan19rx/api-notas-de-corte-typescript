import { CreateUserService, DeleteUserService } from "../services/UserServices";
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

        return res.json(usuarios)
    }
}