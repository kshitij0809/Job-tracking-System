/*
 * Members Session routes (/api/session/members)
 */

import express from 'express'

// Controllers
import SessionsController from '../../app/controllers/SessionsController'

const router = express.Router()

router.post(
  '/login',
  SessionsController.membersLogin,
)

router.get(
  '/logout',
  SessionsController.membersLogout,
)

module.exports = router
