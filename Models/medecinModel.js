import mongoose from 'mongoose'

export const Medecin = mongoose.model(
  'medecin',
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      nom: {
        type: String,
        required: true,
      },
      prenom: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
)
