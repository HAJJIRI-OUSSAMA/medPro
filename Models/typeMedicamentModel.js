import mongoose from 'mongoose'

export const TypeMedicament = mongoose.model(
  'typeMedicament',
  new mongoose.Schema(
    {
      typeName: {
        type: String,
        require: true
      }
    },
    {
      timestamps: true
    }
  )
)
