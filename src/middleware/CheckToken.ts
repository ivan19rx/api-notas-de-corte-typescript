import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
require('dotenv').config()

export function CheckToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: "acesso negado" })
    }
    
    try {
        const secret: string = process.env.SECRET || '';
        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(400).json({ msg: "token invalido" })
    }
}