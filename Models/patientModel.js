import mongoose from 'mongoose'

export const Patient = mongoose.model(
  'patient',
  new mongoose.Schema({
    nomPatient: {
      type: String,
      require: true
    },
    prenomPatient: {
      type: String,
      require: true
    },
    agePatient: {
      type: Number,
      require: true
    },
    medecin: {
      type: mongoose.ObjectId,
      ref: 'Medecin',
      require: true
    }
  })
)
