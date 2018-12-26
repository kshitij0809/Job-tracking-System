import models from '../../models'

import {
  hashPassword,
  verifyPassword,
  verifyEmail,
  // breakCogniId,
} from '../../helpers/UsersHelper'

exports.profile = (req, res) => {
  res.status(200).json({ message: 'Success.' })
}

