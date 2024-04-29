import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

export async function register(req, res){
  try {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    })
    const findUser = await User.findOne({ email:req.body.email }).exec()
    if(isNaN(findUser)){
      throw 'El Email ingresado ya está registrado'
    } else {
      await newUser.save()
      return res.status(200).json(newUser)
    }
  } catch (e) {
    return res.status(500).json({message:e})
  }
}

export async function newUser(req, res){
  try {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        cargo: req.body.cargo,
        estado: req.body.estado,
        rut: req.body.rut
    })
    if(req.body.email === '' || req.body.rut === ''){
      throw 'Campos en blanco'
    }
    const find = await User.find({ rut: req.body.rut }).exec()
    //console.log(isNaN(find));
    //console.log(find);
    if(isNaN(find)){
      throw 'Usuario ya existe'
    } else {
      await newUser.save()
      return res.status(200).json(newUser)
    }
  } catch (e) {
    if(e === 'Usuario ya existe')
    {
      console.log(e);
      return res.status(400).json({message:e})
    } else {
      return res.status(500).json({message:e})
    }
  }
}

export async function login(req, res){
  try {
    const email = String(req.body.correo)
    const password = String(req.body.contrasena)

    const userData = await User.findOne({ correo:email, contrasena:password }).exec()
    if(isNaN(userData)){

      //Generación de TOKEN
      const token = jwt.sign({sub: userData._id}, process.env.API_KEY, { expiresIn:'7d' })
      return res.status(200).json({ nombre: userData.nombre, 
                                    correo:userData.correo, 
                                    apellido:userData.apellido, 
                                    telefono:userData.telefono, 
                                    idRol:userData.idRol, 
                                    rut:userData.rut,
                                    clinicas:userData.clinicas,
                                    token})
    }else {
      return res.status(403).json({code:'403', message:'Not Found'})
    }
  } catch (e) {
    console.log(`error login en API: ${e}`);
  }
}
