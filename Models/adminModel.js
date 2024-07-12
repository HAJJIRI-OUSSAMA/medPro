import mongoose from 'mongoose'

export const Admin = mongoose.model(
  'admin',
  new mongoose.Schema({
    login: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    }
  })
)
