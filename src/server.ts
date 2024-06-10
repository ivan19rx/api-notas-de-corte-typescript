import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { router } from './routes'

import swaggerUi from 'swagger-ui-express'

import swaggerdocs from './swagger.json'

const app = express()

const port = 9090

app.use(express.json())
app.use(cors())

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerdocs))

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: err,
        msg: "Internal server error"
    })
})

app.listen(port, () => {
    console.log("servidor rodando na porta: " + port)
})