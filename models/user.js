import mongoose from 'mongoose'

const { Schema } = mongoose;
const UserSchema = Schema({
  nombre: String,
  correo: String,
  contrasena: { type: String, select: false },
  apellido: String,
  telefono: Number,
  idRol: Number,
  rut: String,
  clinicas: Array,
},
  {
    collection: 'usuarios'
  }
);

export const User = mongoose.model('User', UserSchema)