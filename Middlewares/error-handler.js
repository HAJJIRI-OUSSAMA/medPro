import { env } from '../lib/env'

/**
 * Error handler middleware.
 * Uses status code from error if present.
 */
export async function errorHandler(ctx, next) {
  try {
    await next()
  } catch (err) {
    /* istanbul ignore next */
    ctx.status = err.statusCode || 500
    if (err.statusCode < 500) {
      ctx.body = err.message
    } else {
      ctx.body = err.toJSON ? err.toJSON() : { message: err.message, ...err }
    }
    ctx.body.path = ctx.request.path
    /* istanbul ignore next */
    if (!env.EMIT_STACK_TRACE) {
      delete ctx.body.stack
    }
    console.log('Error in request', err)
  }
}
