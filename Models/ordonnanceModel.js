import mongoose from 'mongoose'

export const Ordonnance = mongoose.model(
  'ordonnance',
  new mongoose.Schema({
    patient: {
      type: mongoose.ObjectId,
      ref: 'Patient',
      require: true
    },
    date: {
      type: Date,
      require: true
    },
    medicament: {
      type: mongoose.ObjectId,
      ref: 'Medicament',
      require: true
    },
    medecin: {
      type: mongoose.ObjectId,
      ref: 'Medecin',
      require: true
    }
  })
)
