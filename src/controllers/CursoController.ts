import prismaClient from "../prisma";
import { CursoRequest } from "../models/interfaces/CursoRequest";

import { CreateCursoService } from "../services/CursoServices";

import { Request, Response } from "express";

export class CreateCurso {
    async handle(req: Request, res: Response) {
        const { nome, faculdade, notaDeCorte, descricao }: CursoRequest = req.body
        const createCursoService = new CreateCursoService
        const curso = await createCursoService.execute({
            nome, faculdade, notaDeCorte, descricao
        })

        return res.json(curso)
    }
}