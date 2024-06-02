import prismaClient from "../prisma";
import { CursoRequest } from "../models/interfaces/CursoRequest";

import { CreateCursoService, EditCursoService } from "../services/CursoServices";

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

export class EditCurso {
    async handle(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const data = req.body

        const editCursoService = new EditCursoService
        const userEdit = await editCursoService.execute(id, data)

        return res.json(userEdit)
    }
}