import mongoose from 'mongoose'

const { Schema } = mongoose;
const UserSchema = Schema({
  nombre: String,
  correo: String,
  contrasena: { type: String, select: false },
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