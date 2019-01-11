/*
 * Users Routes (/api/users)
 */

import express from 'express'

// Controllers
import UserController from '../../app/controllers/UsersController'
import JobController from '../../app/controllers/JobsController'

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
import JobsMiddleware from '../../app/middlewares/JobsMiddleware'
import JobTablesMiddleware from '../../app/middlewares/jobTablesMiddleware'

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

router.use(
  '/job/:id',
  JobsMiddleware.verify,
)



// User Job routes

router.post(
  '/addjob',
  JobController.create,
)

router.put(
  '/addjob/:id',
  JobController.updatejob,
)

router.delete(
  '/addjob/:id',
  JobController.destroyjob
)

router.get(
  '/jobs',
  JobController.index,
)

router.get(
  '/job/:id',
  JobController.show,
)




router.use(
  '/updatecontacts/:id/:JobId',
  JobTablesMiddleware.verify,
)

router.use(
  '/deletecontact/:id/:JobId',
  JobTablesMiddleware.verify,
)

router.use(
  '/addcontact/:JobId',
  JobTablesMiddleware.verify,
)

router.use(
  '/jobcontacts/:JobId',
  JobTablesMiddleware.verify,
)







// User Job-contacts routes

router.post(
  '/addcontact/:JobId',
  JobController.createcontact,
)

router.post(
  '/updatecontacts/:id/:JobId',
  JobController.updatecontact,
)

router.delete(
  '/deletecontact/:id/:JobId',
  JobController.destroycontact
)

router.get(
  '/contacts',
  JobController.contactindex,
)

router.get(
  '/contact/:id',
  JobController.contactshow,
)

router.get(
  '/jobcontacts/:JobId',
  JobController.contactindexjob,
)





// // User Job-documents routes

// router.post(
//   '/adddocument',
//   JobController.createdocument,
// )

// router.put(
//   '/adddocument/:id',
//   JobController.updatedocument,
// )

// router.delete(
//   '/adddocument/:id',
//   JobController.destroydocument
// )

// router.get(
//   '/documents',
//   JobController.documentindex,
// )

// router.get(
//   '/document/:id',
//   JobController.documentshow,
// )

// router.get(
//   '/jobdocuments',
//   JobController.documentindexjob,
// )
// router.get(
//   '/status/:JobId',
//   UserController.getJobStatus,
// )

// router.get(
//   '/note/:JobId',
//   UserController.getjobNote,
// )

// router.get(
//   '/document/:JobId',
//   UserController.getjobDocument,
// )


module.exports = router
