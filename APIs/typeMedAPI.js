import { route, GET, POST, before } from 'awilix-koa'
import { authenticate } from '../Middlewares/authenticate'
let jsonMerger = require('json_merger')

@route('/typeMed')
export default class typeMedAPI {
  constructor({ typeMedController }) {
    this.typeMedController = typeMedController
  }

  @route('/')
  @GET()
  @before([authenticate])
  async listTypeMed(data) {
    jsonMerger.merge(data, await this.typeMedController.all())
  }

  @route('/:id')
  @GET()
  @before([authenticate])
  async getTypeMed(data) {
    jsonMerger.merge(data, await this.typeMedController.get(data.params.id))
  }

  @route('/')
  @POST()
  @before([authenticate])
  async addTypeMed(data) {
    jsonMerger.merge(data, await this.typeMedController.add(data.request.body))
  }
}
