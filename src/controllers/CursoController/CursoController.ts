import prismaClient from "../../prisma";
import { CursoRequest } from "../../models/interfaces/CursoRequest";
import { CreateCursoService, EditCursoService, DeleteCursoService } from "../../services/CursoServices";

import { Request, Response } from "express";

export class ListCursos {
    async handle(req: Request, res: Response) {
        const { nome, faculdade, ano } = req.query;

        try {
            const whereClause: any = {};
            if (nome) {
                whereClause['nome'] = {
                    contains: nome.toString(),
                };
            }
            if (faculdade) {
                whereClause['faculdade'] = {
                    contains: faculdade.toString(),
                };
            }
            if (ano) {
                whereClause['ano'] = {
                    equals: parseInt(ano.toString()),
                };
            }

            const cursos = await prismaClient.cursos.findMany({
                where: whereClause,
            });

           
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

export class GetCursoNames {
    async handle(req: Request, res: Response) {
        

        try {
            
                const cursosNames = await prismaClient.cursos.findMany({
                    distinct: ['nome'],
                    select: {nome: true}
                })

            return res.json({ erro: false, data: cursosNames });
        } catch (error) {
            return res.status(400).json({ erro: true, mensagem: 'Erro ao buscar o nome dos cursos.' });
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