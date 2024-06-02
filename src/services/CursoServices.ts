import prismaClient from '../prisma'
import { CursoRequest } from '../models/interfaces/CursoRequest'

export class CreateCursoService {
    async execute({ nome, faculdade, notaDeCorte, descricao }: CursoRequest) {
        if (!nome) {
            return { erro: true, mensagem: "Digite o nome do curso" }
        }
        if (!faculdade) {
            return { erro: true, mensagem: "Digite a faculdade" }
        }
        if (!notaDeCorte) {
            return { erro: true, mensagem: "Digite a nota de corte" }
        }

        const cursoExists = await prismaClient.cursos.findFirst({
            where: {
                nome: nome
            }
        })

        if (cursoExists) {
            return { erro: true, mensagem: "Já existe um curso cadastrado com este nome" }
        }

       const descricaoValue = descricao || null

        try {
            
            const curso = await prismaClient.cursos.create({
                data: {
                    nome: nome,
                    faculdade: faculdade,
                    notaDeCorte: notaDeCorte,
                    descricao: descricaoValue
                }
            });

            return { erro: false, mensagem: "Curso cadastrado com sucesso" };
        } catch (error) {
            return { erro: true, mensagem: "Ocorreu um erro ao cadastrar o curso" };
        }
    }
}