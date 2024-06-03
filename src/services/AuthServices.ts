import prismaClient from '../prisma'
import express, { Request, Response, NextFunction } from 'express';
import { LoginRequest } from '../models/interfaces/LoginRequest'
import jwt from 'jsonwebtoken'
require('dotenv').config()

export class LoginService {
    async execute( req: Request, res: Response, next: NextFunction) {
        const {email, senha} = req.body
        
        if (!email || !senha) {
            return res.status(400).json({
                erro: true,
                msg: "Erro: Todos os campos devem ser preenchidos!"
            })
        }

        const usuario = await prismaClient.usuario.findFirst({
            where: {
                email: email
            }
        })

        if (!usuario) {
            return res.status(400).json({
                erro: true,
                msg: "Erro: Email ou senha incorretos"
            });
        }

        if (req.body.senha != usuario.senha) {
            return res.status(400).json({
                erro: true,
                msg: "Erro: Email ou senha incorretos"
            })
        }

        try {
            const secret: string = process.env.SECRET || '';
            const token = jwt.sign({
                id: usuario.id,
                nome: usuario.nome,
                nivelAcesso: usuario.nivelacesso
            }, secret)

            const user = {
                nome: usuario.nome,
                nivelacesso: usuario.nivelacesso
            }

            return res.status(200).json({ msg: "autenticado com sucesso", token, user })

        } catch (error) {
            console.log(error)

            return res.status(500).json({
                msg: "ocorreu um erro no servidor"
            })
        }

    }
}