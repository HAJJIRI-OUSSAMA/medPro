import { route, GET, POST, before, DELETE } from 'awilix-koa'
import { authenticate } from '../Middlewares/authenticate'

let jsonMerger = require('json_merger')

@route('/admin')
export default class AdminAPI {
  constructor({ adminController }) {
    this.adminController = adminController
  }

  @route('/')
  @POST()
  async addAdmin(data) {
    jsonMerger.merge(data, await this.adminController.add(data.request.body))
  }
}
