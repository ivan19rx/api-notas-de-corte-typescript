import prismaClient from '../prisma'
import { CursoRequest } from '../models/interfaces/CursoRequest'

interface ExecuteResponse {
    erro: boolean;
    mensagem: string;
}

export class CreateCursoService {
    async execute({ nome, faculdade, notaDeCorte, ano, descricao }: CursoRequest) {
        if (!nome) {
            return { erro: true, mensagem: "Digite o nome do curso" };
        }
        if (!faculdade) {
            return { erro: true, mensagem: "Digite a faculdade" };
        }
        if (!notaDeCorte) {
            return { erro: true, mensagem: "Digite a nota de corte" };
        }

        const cursoExists = await prismaClient.cursos.findFirst({
            where: {
                nome: nome,
                faculdade: faculdade,
                ano: ano
            }
        });

        if (cursoExists) {
            return { erro: true, mensagem: "Já existe um curso cadastrado com este nome na mesma faculdade e ano" };
        }

        let descricaoValue = descricao || null;

        try {
            const curso = await prismaClient.cursos.create({
                data: {
                    nome: nome,
                    faculdade: faculdade,
                    notaDeCorte: notaDeCorte,
                    ano: ano,
                    descricao: descricaoValue
                }
            });

            return { erro: false, mensagem: "Curso cadastrado com sucesso" };
        } catch (erro) {
            return { erro: true, mensagem: "ocorreu algum erro no servidor" };
        }
    }
}

export class EditCursoService {
    async execute(id: number, cursoData: CursoRequest) {
        try {

            const usuarioAtualizado = await prismaClient.cursos.update({
                where: { id: id },
                data: cursoData
            })

            return { erro: false, menssagem: "Usuário editado com sucesso" }

        } catch (error) {
            return { erro: true, menssagem: "Usuário não foi editado com sucesso" }
        }
    }
}

export class DeleteCursoService {
    async execute(id: number) {
        try {
            // Verifica se o usuário existe
            const curso = await prismaClient.cursos.findUnique({
                where: {
                    id: id
                }
            });

            if (!curso) {
                return { erro: true, mensagem: "Curso não encontrado" };
            }

            // Deleta o usuário
            await prismaClient.cursos.delete({
                where: {
                    id: id
                }
            });

            return { erro: false, mensagem: "Curso excluído com sucesso" };
        } catch (error) {
            return { erro: true, mensagem: "Ocorreu um erro ao excluir o curso" };
        }
    }
}