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

    app.get('/api/roles', (req, res) => {
      const roles = [
        { id: 1,
          nombre: 'Administrador',
        },
        { id: 2,
          nombre: 'Doctor'
        },
        { id: 3,
          nombre: 'Recepcionista'
        },
        { id: 4,
          nombre: 'Técnico'
        }
      ]

      res.status(200).json(roles)
    })

    app.get('/api/servicios', (req, res) => {
      
      const servicios = [
        { id: 1,
          nombre: 'Inventario',
        },
        { id: 2,
          nombre: 'Agendamiento',
        },
        { id: 3,
          nombre: 'Consulta',
        },
        { id: 4,
          nombre: 'Caja',
        },
        { id: 5,
          nombre: 'Configuracion'
        }
      ]

      res.status(200).json(servicios)
    })

    app.get('/api/clinica' , (req, res) => {

      //Obtener query params
      const idClinica  = req.query.idClinica
      
      const clinica = {
        id: 1,
        rut: '1.111.111-1',
        nombreFantasia: 'GatoCosmico',
        razonSocial: 'CosmicCat',
      }

      const serviciosClinica = [
        {
          id: 1,
          idClinica: 1,
          idServicio: 1,
          estaHabilitado: true
        },
        {
          id: 2,
          idClinica: 1,
          idServicio: 2,
          estaHabilitado: false
        },
        {
          id: 3,
          idClinica: 1,
          idServicio: 3,
          estaHabilitado: false
        },
        {
          id: 4,
          idClinica: 1,
          idServicio: 4,
          estaHabilitado: false
        },
      ]

      if(clinica.id == idClinica){
        res.status(200).json({clinica:clinica, servicios: serviciosClinica})
      } else {
        res.status(500).json({"error": 'No se encontro la clinica'})
      }
    })

  
    console.info(`ROUTES: /health - /api/user/login`)
    console.info(`API en funcionamiento`)
  })
}
