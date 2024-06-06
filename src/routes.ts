import { Router, Request, Response } from "express";
import { Login, Register } from "./controllers/AuthController";

import { CreateUser, DeleteUser, ListUsers, EditUser, GetUserById } from "./controllers/UserController";
import { CreateCurso, EditCurso, ListCursos, GetCursoById,  DeleteCurso} from "./controllers/CursoController";

import { CheckToken } from "./middleware/CheckToken";

const router = Router()

router.get('/testando', (req: Request, res: Response) => {
    res.json({ msg: "ok" })
})


//rotas de autenticação
router.post('/login',new Login().handle)
router.post('/register', new Register().handle)



//Rota de usuários
router.get('/list-usuarios', CheckToken, new ListUsers().handle)
router.get('/get-usuario/:id', CheckToken, new GetUserById().handle)
router.post('/cad-usuario', CheckToken, new CreateUser().handle)
router.delete('/delete-usuario/:id', CheckToken, new DeleteUser().handle)
router.put('/edit-usuario/:id', CheckToken, new EditUser().handle)

//rota de cursos
router.get('/list-cursos', new ListCursos().handle)
router.get('/get-curso/:id', CheckToken, new GetCursoById().handle)
router.post('/cad-curso', new CreateCurso().handle)
router.delete('/delete-curso/:id', CheckToken, new DeleteCurso().handle)
router.put('/edit-curso/:id', CheckToken, new EditCurso().handle)


export {router}