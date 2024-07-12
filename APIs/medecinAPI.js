import { route, GET, POST, before } from 'awilix-koa' // or `awilix-router-core`
import { authenticate } from '../Middlewares/authenticate'
let jsonMerger = require('json_merger')

@route('/medecin')
export default class medecinAPI {
  constructor({ medecinController }) {
    this.medecinController = medecinController
  }

  @route('/')
  @GET()
  @before([authenticate])
  async listMedecins(ctx) {
    jsonMerger.merge(ctx, await this.medecinController.all())
  }

  @route('/me/')
  @GET()
  @before([authenticate])
  async getMe(ctx) {
    jsonMerger.merge(
      ctx,
      await this.medecinController.getMe(ctx.request.header)
    )
  }

  @route('/:id')
  @GET()
  @before([authenticate])
  async getMedecin(ctx) {
    jsonMerger.merge(ctx, await this.medecinController.get(ctx.params.id))
  }

  @route('/')
  @POST()
  @before([authenticate])
  async addMedecin(ctx) {
    jsonMerger.merge(ctx, await this.medecinController.add(ctx.request.body))
  }

  @route('/login/')
  @POST()
  async loginMedecin(ctx) {
    jsonMerger.merge(ctx, await this.medecinController.login(ctx.request.body))
  }
}
