import { CreateUserService } from "../services/UserServices";
import { Request, Response } from "express";
import { UserRequest } from "../models/interfaces/UserRequest";

export class CreateUser {
    async handle(req: Request, res: Response) {
        const {nome, email, senha, nivelacesso}: UserRequest = req.body
        const createUserService = new CreateUserService
        const user = await createUserService.execute( {
                nome, email, senha, nivelacesso
        })

        return res.json(user)
    }
}