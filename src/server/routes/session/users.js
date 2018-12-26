/*
 * User Session Routes (/api/session/users)
 */

import express from 'express'

import SessionsController from '../../app/controllers/SessionsController'

const router = express.Router()

router.post(
  '/signup/:role',
  SessionsController.signup,
)

router.post(
  '/oauth/:role',
  SessionsController.signup,
)

router.post(
  '/login',
  SessionsController.usersLogin,
)

router.get(
  '/logout',
  SessionsController.usersLogout,
)

module.exports = router
