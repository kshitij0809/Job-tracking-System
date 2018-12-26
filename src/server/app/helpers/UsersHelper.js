import crypto from 'crypto'
import bcrypt from 'bcrypt'
import moment from 'moment'
import Regex from 'regex'
import emailverifier from 'email-verify'


export const verifyPassword = (password) => {
  if (password.length < 8) {
    return false
  }
  return true
}

export const verifyEmail = (email) => /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)

export const hashPassword = (password) => {
  // Hash using bcrypt
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash)

export const cogniId = (id) => {
  const str = `${id}`
  const pad = 'cogni1900000'
  return pad.substring(0, pad.length - str.length) + str
}

export const breakCogniId = (CogniId) => {
  if (!CogniId) {
    return false
  }

  if (!CogniId.includes('cogni19')) {
    return false
  }

  return Number(CogniId.replace('cogni19', ''))
}

export const confirmationCode = (email, role) => crypto.createHash('sha256').update(email + role + moment().unix()).digest('hex').toString()

export const passwordResetToken = (id, email) => crypto.createHash('sha256').update(email + id + moment().unix()).digest('hex').toString()

export const oneTimeHash = (id, email) => crypto.createHash('sha256').update(email + id + moment().unix()).digest('base64').toString()
  .substr(15)
