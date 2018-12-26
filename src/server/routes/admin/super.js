/*
 * Super Admin Routes (/api/admin/super)
 */

import express from 'express'

// Controllers
import AdminController from '../../app/controllers/MembersController/AdminController'

const router = express.Router()

router.get(
  '/',
  AdminController.profile,
)


module.exports = router
