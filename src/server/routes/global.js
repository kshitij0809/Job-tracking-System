import express from 'express'

// import AccessoriesController from '../app/controllers/AccessoriesController'
// import LiveEventsController from '../app/controllers/EventsController/LiveEventsController'
// import UtseController from '../app/controllers/UsersController/UtseController'

const router = express.Router()

router.get('/', (req,res) => {
    res.send('Ok');
})

// router.get(
//   '/trending',
//   AccessoriesController.trending,
// )

// router.get(
//   '/states',
//   AccessoriesController.states,
// )

// router.get(
//   '/state/:state/colleges',
//   AccessoriesController.colleges,
// )

// // Email confirmation route
// router.get(
//   '/confirmationCode/:code',
//   AccessoriesController.confirmationCode,
// )

// // resend confirmation code
// router.get(
//   '/resendConfirmationCode',
//   AccessoriesController.resendConfirmationCode,
// )

// // Password Reset Routes
// router.post(
//   '/api/passwordResetRequest',
//   AccessoriesController.passwordResetRequest,
// )

// router.get(
//   '/api/passwordReset/:code',
//   AccessoriesController.passwordResetGet,
// )

// router.post(
//   '/api/passwordReset',
//   AccessoriesController.passwordResetPost,
// )

// router.get(
//   '/live_events',
//   LiveEventsController.index,
// )

// router.post(
//   '/utse',
//   UtseController.register,
// )

// router.get(
//   '*',
//   (req, res) => {
//     res.status(404).json({ message: 'Not Found.' })
//   },
// )

// router.post(
//   '*',
//   (req, res) => {
//     res.status(404).json({ message: 'Not Found.' })
//   },
// )

// router.put(
//   '*',
//   (req, res) => {
//     res.status(404).json({ message: 'Not Found.' })
//   },
// )

// router.delete(
//   '*',
//   (req, res) => {
//     res.status(404).json({ message: 'Not Found.' })
//   },
// )

module.exports = router
