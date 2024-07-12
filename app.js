import { createServer } from './lib/server'
import { env } from './lib/env'

createServer().then(
  (app) =>
    app.listen(env.PORT, () => {
      const mode = env.NODE_ENV
      console.log(`Server listening on ${env.PORT} in ${mode} mode`)
    }),
  (err) => {
    console.log('Error while starting up server', {
      name: err.name,
      message: err.message,
      stack: err.stack,
    })
    setTimeout(function () {
      console.log('exiting...')
      process.exit(1)
    }, 1000)
  }
)
