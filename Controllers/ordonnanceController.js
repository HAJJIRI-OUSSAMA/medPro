import { NotFound, BadRequest } from 'fejl'
import { Ordonnance } from '../Models/ordonnanceModel'

/**
 * Ordonnance Controller.
 * Manages ordonnance operations.
 */
export default class OrdonnanceController {
  async all() {
    return {
      status: 200,
      body: await Ordonnance.find({}).exec()
    }
  }

  async get(id) {
    var ordonnanceExistant = await Ordonnance.findById(id).exec()
    if (ordonnanceExistant) {
      return {
        status: 200,
        body: ordonnanceExistant
      }
    } else {
      throw new NotFound({
        err_code: 'ORDONNANCE_NOT_FOUND',
        message: 'Ordonnance not found in database'
      })
    }
  }

  async add(data, headers) {
    if (headers == null) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        message: 'erreur headers'
      })
    }

    if (headers['explicite-token'] == null) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        message: 'erreur headers'
      })
    }

    if (headers['explicite-token'].id == null) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        message: 'erreur headers'
      })
    }

    let ordonnance = new Ordonnance({
      ...data, //spread data
      medecin: headers['explicite-token'].id
    })

    let error = await ordonnance.validateSync()

    if (error) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        errors: error.errors
      })
    }

    await ordonnance.save()

    return {
      status: 201,
      body: ordonnance
    }
  }

  async delete(id) {
    const result = await Ordonnance.findByIdAndDelete(id).exec()
    if (result) {
      return {
        status: 200,
        message: 'Ordonnance successfully deleted'
      }
    } else {
      throw new NotFound({
        err_code: 'ORDONNANCE_NOT_FOUND',
        message: 'Ordonnance not found in database'
      })
    }
  }
}
