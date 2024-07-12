import { NotFound, BadRequest } from 'fejl'
import { Medicament } from '../Models/medicamentModel'

/**
 * Medicament Controller.
 * Manages medicament operations.
 */
export default class MedicamentController {
  async all() {
    return {
      status: 200,
      body: await Medicament.find({}).exec()
    }
  }

  async get(id) {
    const medicamentExistant = await Medicament.findById(id).exec()
    if (medicamentExistant) {
      return {
        status: 200,
        body: medicamentExistant
      }
    } else {
      throw new NotFound({
        err_code: 'MEDICAMENT_NOT_FOUND',
        message: 'Medicament not found in database'
      })
    }
  }

  async add(data) {
    const medicament = new Medicament(data)
    const error = await medicament.validateSync()

    if (error) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        errors: error.errors
      })
    }

    await medicament.save()
    return {
      status: 201,
      body: medicament
    }
  }

  async delete(id) {
    const result = await Medicament.findByIdAndDelete(id).exec()
    if (result) {
      return {
        status: 200,
        message: 'Medicament successfully deleted'
      }
    } else {
      throw new NotFound({
        err_code: 'MEDICAMENT_NOT_FOUND',
        message: 'Medicament not found in database'
      })
    }
  }
}
