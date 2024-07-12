import { NotFound, BadRequest } from 'fejl'
import { Medecin } from '../Models/medecinModel'
import { keyService } from '../Services/rsaService'

/**
 * Todo Controller.
 * Gets a todo store injected.
 */
export default class MedecinController {
  async all() {
    return {
      status: 200,
      body: await Medecin.find({}).exec()
    }
  }

  async getMe(headers) {
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
    var medecinExistant = await Medecin.findById(
      headers['explicite-token'].id
    ).exec()

    if (medecinExistant) {
      return {
        status: 200,
        body: {
          ...medecinExistant._doc,
          password: null
        }
      }
    } else {
      throw new NotFound({
        err_code: 'CLIENT_NOT_FOUND',
        message: 'clients not found in database'
      })
    }
  }
  async get(id) {
    var medecinExistant = await Medecin.findById(id).exec()
    if (medecinExistant) {
      return {
        status: 200,
        body: medecinExistant
      }
    } else {
      throw new NotFound({
        err_code: 'CLIENT_NOT_FOUND',
        message: 'clients not found in database'
      })
    }
  }

  async add(data) {
    let medecin = new Medecin(data)

    let error = await medecin.validateSync()

    if (error) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        errors: error.errors
      })
    }

    await medecin.save()

    return {
      status: 201,
      body: medecin
    }
  }

  async login(data) {
    var medecinExistant = await Medecin.findOne({
      username: data.username,
      password: data.password
    }).exec()

    if (medecinExistant) {
      var payload = {
        id: medecinExistant._id,
        username: medecinExistant.username
      }
      var token = await keyService().encrypt(payload)

      if (!token) {
        throw new BadRequest({
          err_code: 'TOKEN_CREATION',
          message: 'token creation error'
        })
      }

      return {
        status: 200,
        body: {
          token: token
        }
      }
    } else {
      throw new NotFound({
        err_code: 'CLIENT_NOT_FOUND',
        message: 'clients not found in database'
      })
    }
  }
}
