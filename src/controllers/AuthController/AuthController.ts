import { Request, Response } from "express";
import { LoginService } from "../../services/AuthService";
import { LoginRequest } from "../../models/interfaces/AuthRequests";
import { UserRequest } from "../../models/interfaces/UserRequest";
import { CreateUserService } from "../../services/UserServices";

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

export class Register {
    async handle(req: Request, res: Response) {
        const { nome, email, senha, nivelacesso }: UserRequest = req.body
        const createUserService = new CreateUserService
        const user = await createUserService.execute({
            nome, email, senha, nivelacesso
        })

        return res.json(user)
    }
}

