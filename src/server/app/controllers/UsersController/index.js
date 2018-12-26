import fs from 'fs'
import moment from 'moment'
import models from '../../models'

// import {
//   cogniId,
//   hashPassword,
//   comparePassword,
//   verifyPassword,
//   breakCogniId,
//   oneTimeHash,
// } from '../../helpers/UsersHelper'
// import { uploader } from '../../helpers/UploaderHelper'
// import colleges from '../../utils/colleges'

require('dotenv').config()


exports.getBankDetails = (req, res) => {
     res.status(200).json({ message: 'Bank Details Fetched.' })

 }

  