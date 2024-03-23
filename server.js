import express from 'express'
import { userRouter } from './routes/user.js'

const app = express()
const port = process.env.PORT

export function startServer(){
  app.listen(port, () => {
    console.log(`Starting APP... PORT:${port}`)
    //eliminar
    //app.use(cors())
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())

    app.get('/health', (req, res) => {
      res.json({backendStatus:'ok'})
    })

    app.use('/api/user', userRouter)
    console.info(`ROUTES: /health - /api/user/login`)
    console.info(`API en funcionamiento`)
  })

}
