/* eslint-disable global-require */

// Middlewares
import TokenMiddleware from '../app/middlewares/TokenMiddleware'
// import MemberTokenMiddleware from '../app/middlewares/MemberTokenMiddleware'

import RoleMiddleware from '../app/middlewares/RoleMiddleware'

import {
  ADMIN_ROUTE,
  USERS_ROUTE,
  MEMBERS_ROUTE,
  SESSION_ROUTE,
} from './namespace'


const router = require('express').Router()

const UserMiddlewareGroup = [
  TokenMiddleware.verify,
  // EmailVerificationMiddleware.verifyEmail,
  // CompleteDetailsMiddleware.completeDetails,
]



router.use(
  USERS_ROUTE,
  UserMiddlewareGroup,
)


// router.use(
//   ADMIN_ROUTE,
//   MemberTokenMiddleware.verify,
// )

// router.use(
//   MEMBERS_ROUTE,
//   MemberTokenMiddleware.verify,
// )

router.use(SESSION_ROUTE, require('./session'))
router.use(USERS_ROUTE, require('./users'))
// router.use(ADMIN_ROUTE, require('./admin'))
// router.use(MEMBERS_ROUTE, require('./members'))
router.use('/g', require('./global'))

// JUST TEMPORARY HERE
router.use('*', require('./global'))

module.exports = router
