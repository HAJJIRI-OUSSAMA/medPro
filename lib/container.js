import { createContainer, Lifetime } from 'awilix'
/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
export function configureContainer() {
  return createContainer()
    .loadModules(
      [
        // SCOPED: means that each request gets a separate instance
        ['Controllers/*.js', Lifetime.SCOPED],
        // SINGLETON: one global instance
        //['Services/*.js', Lifetime.SINGLETON]
      ],
      {
        cwd: `${__dirname}/..`,
        // Example: registers `services/todo-service.js` as `todoService`
        formatName: 'camelCase',
      }
    )
    .register({
      // register costume dependencies here
      //   logger: asValue(logger) // asValue: provide it as-is to anyone who wants it.
    })
}
