import mongoose from 'mongoose'

export const Medicament = mongoose.model(
  'medicament',
  new mongoose.Schema(
    {
      nameMedicament: {
        type: String,
        require: true
      },

      typeMedicament: {
        type: mongoose.ObjectId,
        ref: 'TypeMedicament',
        required: true
      }
    },
    {
      timestamps: true
    }
  )
)
