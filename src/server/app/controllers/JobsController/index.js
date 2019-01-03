import models from '../../models'
// import { registerUtil } from '../../helpers/EventsHelper'

// // View all Events
// exports.index = (req, res) => {
//   models.Job.findAll({
//     where: {
//       type: { $ne: 'workshop' },
//     },
//     attributes: ['id', 'name', 'description', 'thumbnail', 'tags'],
//     include: [{
//       model: models.Department,
//       attributes: ['id', 'name'],
//     }],
//   }).then((events) => {
//     const e = []
//     events.forEach((row) => {
//       e.push(row.dataValues)
//     })
//     res.status(200).json({ events: e })
//   }).catch((err) => {
//     res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
//   })
// }

// Create new Event
exports.create = (req, res) => {
  const { UserId } = res.locals
  console.log(UserId,req.body)
  if (req.body) {
    // check valid input fields
    models.Job.create({
      UserId:UserId,
      title:req.body.title,
      description:req.body.description,
      company:req.body.company,
      url:req.body.url,
      workType:req.body.workType,
      location:req.body.location,
      nextStepDue:req.body.nextStepDue
    }).then((e) => {
      console.log(e)
      res.status(201).json({ message: 'Job Created.' })
    }).catch((err) => {
      res.status(500).json({ message: 'Something Went Wrong. in body', err: err })
    })
  } else {
    res.status(400).json({ message: 'Invalid Data.' })
  }
}

// // View an Event
// exports.show = (req, res) => {
//   models.Event.findById(req.params.id).then((event) => {
//     if (event === null) {
//       res.status(404).json({ message: 'Event Not Found.' })
//       return
//     }
//     res.status(200).json({ message: 'Event Details Fetched.', event })
//   }).catch(() => {
//     res.status(500).json({ message: "Something Doesn't seem right" })
//   })
// }


// // Update an Event
// exports.update = (req, res) => {
//   if (!req.body.details) {
//     res.status(204).json({ message: 'No content Provided.' })
//     return
//   }

//   models.Event.update(
//     req.body.details,
//     { where: { id: req.params.id } },
//   ).then(() => {
//     res.status(200).json({ message: 'Event Updated Successfully!' })
//   }).catch((err) => {
//     res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
//   })
// }

// // Delete an Event
// exports.destroy = (req, res) => {
//   models.Event.destroy({
//     where: {
//       id: req.params.id,
//     },
//   }).then(() => {
//     res.status(204).json({ message: 'Event Deleted Successfully!' })
//   }).catch((err) => {
//     res.status(400).json({ message: err.errors[0].message })
//   })
// }


// // Fetch minimal details of events
// exports.minimal = (req, res) => {
//   const UserTeams = []
//   models.User.findById(res.locals.UserId).then((user) => {
//     user.getTeams().then((teams) => {
//       teams.forEach((row) => {
//         UserTeams.push(row.EventId)
//       })
//       models.Event.findAll({
//         order: [
//           ['updatedAt', 'DESC'],
//         ],
//         where: { deleted: false },
//         include: [{
//           model: models.Central,
//           attributes: ['name', 'id'],
//         },
//         {
//           model: models.Department,
//           attributes: ['name', 'id'],
//         }],
//       }).then((e) => {
//         const events = []
//         e.forEach((row) => {
//           const event = {}
//           event.id = row.id
//           event.name = row.name
//           event.type = row.type
//           event.abstract = row.abstract
//           event.teamLimit = Number(row.teamLimit)
//           event.registered = UserTeams.includes(row.id)
//           event.CentralId = row.CentralId
//           event.department = row.Department
//           event.DepartmentId = row.DepartmentId
//           events.push(event)
//         })
//         res.status(200).json({ message: 'Event Fetched.', events })
//       }).catch((err) => {
//         res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
//       })
//     })
//   })
// }

