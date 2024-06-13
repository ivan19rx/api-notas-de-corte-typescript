import prismaClient from "../../prisma";
import { CursoRequest } from "../../models/interfaces/CursoRequest";
import { CreateCursoService, EditCursoService, DeleteCursoService } from "../../services/CursoServices";

import { Request, Response } from "express";

export class ListCursos {
    async handle(req: Request, res: Response) {
        const { nome, faculdade, ano } = req.query;
        let cursos;

        try {
            if (nome && faculdade && typeof ano === 'string') {
                cursos = await prismaClient.cursos.findMany({
                    where: {
                        nome: {
                            contains: nome.toString(), // Filtrar por nome
                        },
                        faculdade: {
                            contains: faculdade.toString(), // Filtrar por faculdade
                        },
                        ano: {
                            equals: parseInt(ano)
                        }
                        
                        
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
            } else if (typeof ano === 'string') {
                cursos = await prismaClient.cursos.findMany({
                    where: {
                        ano: parseInt(ano), // Filtrar por ano
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

        return res.json({id: curso.id, nome: curso.nome, faculdade: curso.faculdade, notaDeCorte: curso.notaDeCorte, descricao: curso.descricao})


    }
}

export class GetFaculdades {
    async handle(req: Request, res: Response) {
        

        try {
            
                const faculdades = await prismaClient.cursos.findMany({
                    distinct: ['faculdade'],
                    select: {faculdade: true}
                })

            return res.json({ erro: false, data: faculdades });
        } catch (error) {
            return res.status(400).json({ erro: true, mensagem: 'Erro ao buscar faculdades.' });
        }
    }
}


export class CreateCurso {
    async handle(req: Request, res: Response) {
        const { nome, faculdade, notaDeCorte, ano, descricao }: CursoRequest = req.body
        const createCursoService = new CreateCursoService
        const curso = await createCursoService.execute({
            nome, faculdade, notaDeCorte,ano, descricao
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