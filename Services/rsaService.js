import { env } from '../lib/env'
var ls = require('local-storage')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

function keyService() {
  async function create() {
    // if existe delete
    if (ls(env.PRK_FILE)) {
      ls.remove(env.PRK_FILE)
      ls.remove(env.PBK_FILE)
      ls.remove(env.KD_FILE)
    }

    // create PRK PBK
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    })

    ls.set(env.PRK_FILE, privateKey)
    ls.set(env.PBK_FILE, publicKey)
    ls.set(env.KD_FILE, new Date())

    return true
  }

  return {
    async getPublicKey() {
      // if existe
      if (!ls(env.PBK_FILE)) {
        await create()
      }

      // id not old
      if (ls(env.KD_FILE)) {
        var todayDate = new Date()
        var savedDate = new Date(ls(env.KD_FILE))

        savedDate.setDate(savedDate.getDate() + 30)

        if (savedDate.getTime() < todayDate.getTime()) {
          await create()
        }
      }

      if (ls(env.PBK_FILE)) {
        return ls(env.PBK_FILE)
      }

      return false
    },
    async encrypt(payload) {
      // if existe
      if (!ls(env.PRK_FILE)) {
        await create()
      }

      // id not old
      if (ls(env.KD_FILE)) {
        var todayDate = new Date()
        var savedDate = new Date(ls(env.KD_FILE))

        savedDate.setDate(savedDate.getDate() + 30)

        if (savedDate.getTime() < todayDate.getTime()) {
          await create()
        }
      }

      if (ls(env.PRK_FILE)) {
        var token = jwt.sign({ data: payload }, ls(env.PRK_FILE), {
          issuer: 'oussamahajjiri',
          subject: 'contact@oussamahajjiri.com',
          audience: 'oussamahajjiri.com',
          expiresIn: '12h',
          algorithm: 'RS256', // RSASSA [ "RS256", "RS384", "RS512" ]
        })

        return token
      }

      return false
    },
    async verify(publicKey, token) {
      try {
        var legit = jwt.verify(token, publicKey, {
          issuer: 'oussamahajjiri',
          subject: 'contact@oussamahajjiri.com',
          audience: 'oussamahajjiri.com',
          expiresIn: '12h',
          algorithm: 'RS256', // RSASSA [ "RS256", "RS384", "RS512" ]
        })

        return legit
      } catch (err) {
        return false
      }
    },
  }
}

export { keyService }
