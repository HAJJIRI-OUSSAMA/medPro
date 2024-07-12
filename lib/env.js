import yenv from 'yenv'

Object.assign(process.env, { NODE_ENV: process.env.NODE_ENV || 'development' })

/**
 * We just export what `dotenv` returns.
 * `keyblade` will make sure we don't rely on undefined values.
 */
export const env = yenv('env.yaml', {
  strict: true, // protect against undefined keys

  // allows these keys to not exist.
  optionalKeys: [],

  logBeforeThrow: (message, key) =>
    console.log(`[yenv] ${key} not found in the loaded environment`, { key }),
})
