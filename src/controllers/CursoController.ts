import prismaClient from "../prisma";
import { CursoRequest } from "../models/interfaces/CursoRequest";
import { CreateCursoService, EditCursoService, DeleteCursoService } from "../services/CursoServices";

import { Request, Response } from "express";

export class ListCursos {
    async handle(req: Request, res: Response) {
        const cursos = await prismaClient.cursos.findMany()

        if (cursos.length === 0) {
            return res.json({ msg: "Não há cursos cadastrados" })
        }

        return res.json({ erro: false, data: cursos })
    }
}

export class DeleteCurso {
    async handle(req: Request, res: Response) {
        const id = parseInt(req.params.id)

        const deleteCursoService = new DeleteCursoService
        const deleteCurso = await deleteCursoService.execute(id)

        return res.json(deleteCurso)
    }
}

export class GetCursoById {
    async handle(req: Request, res: Response) {

        const id = parseInt(req.params.id)

        const curso = await prismaClient.cursos.findFirst({
            where: {
                id: id
            }
        })

        if (!curso) {
            return res.json({ erro: true, msg: "falha ao buscar curso" })
        }

        return res.json(curso)


    }
}


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
        const data: CursoRequest = req.body

        const editCursoService = new EditCursoService
        const userEdit = await editCursoService.execute(id, data)

        return res.json(userEdit)
    }
}