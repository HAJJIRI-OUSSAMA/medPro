import { route, PUT, GET, POST, before, DELETE } from 'awilix-koa'
import { authenticate } from '../Middlewares/authenticate'

let jsonMerger = require('json_merger')

@route('/patient')
export default class patientAPI {
  constructor({ patientController }) {
    this.patientController = patientController
  }

  @route('/')
  @GET()
  @before([authenticate])
  async listPatients(data) {
    jsonMerger.merge(data, await this.patientController.all())
  }

  @route('/:id')
  @GET()
  @before([authenticate])
  async getPatient(data) {
    jsonMerger.merge(data, await this.patientController.get(data.params.id))
  }

  @route('/')
  @POST()
  @before([authenticate])
  async addPatient(data) {
    jsonMerger.merge(
      data,
      await this.patientController.add(data.request.body, data.request.header)
    )
  }

  @route('/:id')
  @DELETE()
  @before([authenticate])
  async deletePatient(data) {
    jsonMerger.merge(data, await this.patientController.delete(data.params.id))
  }

  @route('/:id')
  @PUT()
  @before([authenticate])
  async updatePatient(ctx) {
    const { id } = ctx.params
    const body = ctx.request.body
    try {
      const result = await this.patientController.update(id, body)
      ctx.response.status = result.status
      ctx.body = result.body
    } catch (error) {
      ctx.throw(error.status || 500, error.message)
    }
  }
}
