import prismaClient from "../prisma";
import { CursoRequest } from "../models/interfaces/CursoRequest";
import { CreateCursoService, EditCursoService, DeleteCursoService } from "../services/CursoServices";

import { Request, Response } from "express";

export class ListCursos {
    async handle(req: Request, res: Response) {
        const { nome, faculdade } = req.query;
        let cursos;

        try {
            if (nome && faculdade) {
                cursos = await prismaClient.cursos.findMany({
                    where: {
                        nome: {
                            contains: nome.toString(), // Filtrar por nome
                        },
                        faculdade: {
                            equals: faculdade.toString(), // Filtrar por faculdade
                        },
                    },
                });
            } else if (nome) {
                cursos = await prismaClient.cursos.findMany({
                    where: {
                        nome: {
                            contains: nome.toString(), // Filtrar por nome
                        },
                    },
                });
            } else if (faculdade) {
                cursos = await prismaClient.cursos.findMany({
                    where: {
                        faculdade: {
                            contains: faculdade.toString(), // Filtrar por faculdade
                        },
                    },
                });
            } else {
                cursos = await prismaClient.cursos.findMany(); // Sem filtros
            }

            return res.json({ erro: false, data: cursos });
        } catch (error) {
            return res.status(500).json({ erro: true, mensagem: 'Erro ao buscar cursos.' });
        }
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