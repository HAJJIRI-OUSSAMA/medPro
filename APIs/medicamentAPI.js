import { route, GET, POST, before, DELETE } from 'awilix-koa'
import { authenticate } from '../Middlewares/authenticate'

let jsonMerger = require('json_merger')

@route('/medicament')
export default class MedicamentAPI {
  constructor({ medicamentController }) {
    this.medicamentController = medicamentController
  }

  @route('/')
  @GET()
  @before([authenticate])
  async listMedicaments(data) {
    jsonMerger.merge(data, await this.medicamentController.all())
  }

  @route('/:id')
  @GET()
  @before([authenticate])
  async getMedicament(data) {
    jsonMerger.merge(data, await this.medicamentController.get(data.params.id))
  }

  @route('/')
  @POST()
  @before([authenticate])
  async addMedicament(data) {
    jsonMerger.merge(
      data,
      await this.medicamentController.add(data.request.body)
    )
  }

  @route('/delete/:id')
  @DELETE()
  @before([authenticate])
  async deleteMedicament(data) {
    jsonMerger.merge(
      data,
      await this.medicamentController.delete(data.params.id)
    )
  }
}
