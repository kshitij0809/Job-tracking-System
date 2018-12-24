require('dotenv').config()

export const env = process.env.NODE_ENV

export const isProd = env === 'production'

export const isDev = env === 'development'

export const isTest = env === 'test'

export const allowedDomains = () => {
  if (!process.env.ALLOWED_DOMAIN) {
    throw { err: 'Please specify ALLOWED_DOMAIN in your env file' }
  }

  return process.env.ALLOWED_DOMAIN.split(',')
}
