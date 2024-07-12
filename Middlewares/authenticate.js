import { keyService } from '../Services/rsaService'

async function authenticate(ctx, next) {
  /**
   *
   * check if header contains de X_authentification
   *
   */

  if (!ctx.request.header['x-access-token']) {
    ctx.status = 401 // unauthorized
    ctx.body = {
      message: 'X_auth unfound',
      err_code: 'X_AUTH_NOT_FOUND'
    }

    return ctx.body
  }

  let publicKey = await keyService().getPublicKey()

  let keyValues = await keyService().verify(
    publicKey,
    ctx.request.header['x-access-token']
  )

  if (!keyValues) {
    ctx.status = 401 // unauthorized
    ctx.body = {
      message: 'X_auth not correct',
      err_code: 'X_AUTH_BAD'
    }

    return ctx.body
  }

  ctx.request.header['explicite-token'] = keyValues.data

  await next()
}

export { authenticate }
