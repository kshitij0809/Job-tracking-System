import crypto from 'crypto'
import moment from 'moment'

// Generate token
export const generateToken = (id, email) =>
  crypto.createHash('sha256').update(id + email + moment().unix()).digest('base64').toString()
