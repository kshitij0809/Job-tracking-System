/*
 * Users Routes (/api/users)
 */

import express from 'express'

// Controllers
import UserController from '../../app/controllers/UsersController'
// import EventsController from '../../app/controllers/EventsController'
// import ExpanseController from '../../app/controllers/EventsController/ExpanseController'
// import CertificateController from '../../app/controllers/CertificateController'
// import TeamController from '../../app/controllers/UsersController/TeamController'
// import AbstractController from '../../app/controllers/AbstractController'
// import PaymentController from '../../app/controllers/PaymentController'
// import RecieptController from '../../app/controllers/UsersController/RecieptController'

// Middlewares
import TokenMiddleware from '../../app/middlewares/TokenMiddleware'
// import EmailVerificationMiddleware from '../../app/middlewares/EmailVerificationMiddleware'
// import CompleteDetailsMiddleware from '../../app/middlewares/CompleteDetailsMiddleware'
// import RegistrationMiddleware from '../../app/middlewares/RegistrationMiddleware'
// import EventsMiddleware from '../../app/middlewares/EventsMiddleware'

// import RoleMiddleware from '../../app/middlewares/RoleMiddleware'

// import { SPP_ROUTE } from '../namespace'

// import { SPP_ROLE } from '../roles'

const router = express.Router()

const UserMiddlewareGroup = [
  TokenMiddleware.verify,
  // EmailVerificationMiddleware.verifyEmail,
  // CompleteDetailsMiddleware.completeDetails,
]

// router.use(
//   SPP_ROUTE,
//   UserMiddlewareGroup,
//   RegistrationMiddleware.spp,
//   RoleMiddleware.allowedRoles([SPP_ROLE]),
// )

// router.use(
//   '/event',
//   EventsMiddleware.verify,
// )

// router.use(SPP_ROUTE, require('./spp'))

router.get(
  '/',
  UserController.getBankDetails,
)


module.exports = router
