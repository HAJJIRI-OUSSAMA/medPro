import * as http from 'http'
import Koa from 'koa'
import cors from '@koa/cors'
import respond from 'koa-respond'
import compress from 'koa-compress'
import formidable from 'koa2-formidable'
import { loadControllers, scopePerRequest } from 'awilix-koa'
import { connectToDB, closeDB } from '../Databases/MongoDB'
import { configureContainer } from './container'
import { notFoundHandler } from '../Middlewares/not-found'
import { errorHandler } from '../Middlewares/error-handler'

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<http.Server>} The configured app.
 */
export async function createServer() {
  const app = new Koa()

  connectToDB()

  const container = configureContainer()

  app
    // Top middleware is the error handler.
    .use(errorHandler)
    // Compress all responses.
    .use(compress())
    // Adds ctx.ok(), ctx.notFound(), etc..
    .use(respond())
    // Handles CORS.
    .use(cors())
    // Parses request bodies.
    .use(formidable())

    .use(scopePerRequest(container))
    .use(loadControllers('../APIs/*.js', { cwd: __dirname }))

    // Default handler when nothing stopped the chain.
    .use(notFoundHandler)

  // Creates a http server ready to listen.
  const server = http.createServer(app.callback())

  // Add a `close` event listener so we can clean up resources.
  server.on('close', () => {
    // You should tear down database connections, TCP connections, etc
    // here to make sure Jest's watch-mode some process management
    // tool does not release resources.
    closeDB()

    console.log('Server exited!')
  })

  console.log('Server created, ready to listen')
  return server
}
