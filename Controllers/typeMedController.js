import { NotFound, BadRequest } from 'fejl'
import { TypeMedicament } from '../Models/typeMedicamentModel'

/**
 * TypeMedicament Controller.
 * Manages type medicament operations.
 */
export default class TypeMedController {
  async all() {
    return {
      status: 200,
      body: await TypeMedicament.find({}).exec()
    }
  }

  async get(id) {
    const typeMedicamentExistant = await TypeMedicament.findById(id).exec()
    if (typeMedicamentExistant) {
      return {
        status: 200,
        body: typeMedicamentExistant
      }
    } else {
      throw new NotFound({
        err_code: 'TYPE_MEDICAMENT_NOT_FOUND',
        message: 'TypeMedicament not found in database'
      })
    }
  }

  async add(data) {
    const typeMedicament = new TypeMedicament(data)
    const error = await typeMedicament.validateSync()

    if (error) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        errors: error.errors
      })
    }

    await typeMedicament.save()
    return {
      status: 201,
      body: typeMedicament
    }
  }

  async delete(id) {
    const result = await TypeMedicament.findByIdAndDelete(id).exec()
    if (result) {
      return {
        status: 200,
        message: 'TypeMedicament successfully deleted'
      }
    } else {
      throw new NotFound({
        err_code: 'TYPE_MEDICAMENT_NOT_FOUND',
        message: 'TypeMedicament not found in database'
      })
    }
  }
}
