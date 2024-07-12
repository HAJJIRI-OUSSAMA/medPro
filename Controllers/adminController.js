import { NotFound, BadRequest } from 'fejl'
import { Admin } from '../Models/adminModel'

/**
 * Admin Controller.
 * Manages admin operations.
 */
export default class AdminController {
  async all() {
    return {
      status: 200,
      body: await Admin.find({}).exec()
    }
  }

  async add(data) {
    const admin = new Admin(data)
    const error = await admin.validateSync()

    if (error) {
      throw new BadRequest({
        err_code: 'FORMAT_ERROR',
        errors: error.errors
      })
    }

    await admin.save()
    return {
      status: 201,
      body: admin
    }
  }
}
