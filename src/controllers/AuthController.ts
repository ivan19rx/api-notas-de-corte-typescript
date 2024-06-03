import { Request, Response } from "express";
import { LoginService } from "../services/AuthServices";
import { LoginRequest } from "../models/interfaces/LoginRequest";

export class Login {
    async handle(req: Request, res: Response) {
        const { email, senha }: LoginRequest = req.body
        const loginService = new LoginService

        const auth = await loginService.execute({
            email, senha
        })

        return res.json(auth)

    }
}