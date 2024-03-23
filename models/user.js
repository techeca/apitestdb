import mongoose from 'mongoose'

const { Schema } = mongoose;
const UserSchema = Schema({
  correo: String,
  contrasena: { type: String, select: false },
  nombre: String,
  apellido: String,
  telefono: Number,
  cargo: String,
  rut: String
},
  {
    collection: 'usuarios'
  }
);

export const User = mongoose.model('User', UserSchema)