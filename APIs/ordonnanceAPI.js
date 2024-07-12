import { route, GET, POST, before, DELETE } from 'awilix-koa'
import { authenticate } from '../Middlewares/authenticate'

let jsonMerger = require('json_merger')

@route('/ordonnance')
export default class OrdonnanceAPI {
  constructor({ ordonnanceController }) {
    this.ordonnanceController = ordonnanceController
  }

  @route('/')
  @GET()
  @before([authenticate])
  async listOrdonnances(data) {
    jsonMerger.merge(data, await this.ordonnanceController.all())
  }

  @route('/:id')
  @GET()
  @before([authenticate])
  async getOrdonnance(data) {
    jsonMerger.merge(data, await this.ordonnanceController.get(data.params.id))
  }

  @route('/')
  @POST()
  @before([authenticate])
  async addOrdonnance(data) {
    jsonMerger.merge(
      data,
      await this.ordonnanceController.add(
        data.request.body,
        data.request.header
      )
    )
  }

  @route('/delete/:id')
  @DELETE()
  @before([authenticate])
  async deleteOrdonnance(data) {
    jsonMerger.merge(
      data,
      await this.ordonnanceController.delete(data.params.id)
    )
  }
}
