import { Router, Request, Response } from "express";

import { CreateUser } from "./controllers/UserController";

const router = Router()

router.get('/testando', (req: Request, res: Response) => {
    res.json({ msg: "ok" })
})

router.post('/cad-usuario', new CreateUser().handle)

export {router}