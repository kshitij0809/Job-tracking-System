import models from '../../models'
// import { registerUtil } from '../../helpers/EventsHelper'
const Sequelize = require('sequelize')

// View all Job
exports.index = (req, res) => {
  const { UserId } = res.locals
  models.Job.findAll({
    where: {
      UserId,
    },
    attributes: ['id', 
    'title',
    'description',
    'company',
    'url',
    'workType',
    'location',
    'nextStepDue',
    'UserId'],
    
  }).then((jobs) => {
    const e = []
    jobs.forEach((row) => {
      e.push(row.dataValues)
    })
    res.status(200).json({ jobs: e })
  }).catch((err) => {
    res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
  })
}

// Create new Job
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
      res.status(500).json({ message: 'Something Went Wrong. in body', err: err.code })
    })
  } else {
    res.status(400).json({ message: 'Invalid Data.' })
  }
}

// View a Job
exports.show = (req, res) => {
  const { UserId } = res.locals
  models.Job.findAll({where:{UserId:UserId,id:req.params.id}}).then((job) => {
    if (job === null) {
      res.status(404).json({ message: 'Job Not Found.' })
      return
    }

    res.status(200).json({ message: 'Job Details Fetched.', job })
  }).catch((err) => {
    res.status(500).json({ message: "Something Doesn't seem right" ,err:err})
  })


}


// Update a Job
exports.updatejob = (req, res) => {

  if (!req.body.details) {
    res.status(204).json({ message: 'No content Provided.' })
    return
  }

  models.Job.update(
    req.body.details,
    { where: { id: req.params.id } },
  ).then(() => {
    res.status(200).json({ message: 'Job Updated Successfully!' })
  }).catch((err) => {
    res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
  })
}

// Delete a Job
exports.destroyjob = (req, res) => {
  models.Job.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.status(204).json({ message: 'Job Deleted Successfully!' })
  }).catch((err) => {
    res.status(400).json({ message: err.errors[0].message })
  })
}





// // View all Job-contacts
// exports.contactindex = (req, res) => {
//   const { UserId } = res.locals
//   models.Contact.findAll({
//     where: {
//       UserId,
//     },
//     attributes: ['id', 
//     'personName',
//     'personEmail',
//     'personNumber'],
    
//   }).then((contacts) => {
//     const e = []
//     contacts.forEach((row) => {
//       e.push(row.dataValues)
//     })
//     res.status(200).json({ contacts: e })
//   }).catch((err) => {
//     res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
//   })
// }

// // Create new Job-contacts
// exports.createcontact = (req, res) => {
//   const { UserId } = res.locals
//   console.log(UserId,req.body)
//   if (req.body) {
//     // check valid input-contacts fields
//     models.Contact.create({
//       UserId:UserId,
//       title:req.body.title,
//       description:req.body.description,
//       company:req.body.company,
//       url:req.body.url,
//       workType:req.body.workType,
//       location:req.body.location,
//       nextStepDue:req.body.nextStepDue
//     }).then((e) => {
//       console.log(e)
//       res.status(201).json({ message: 'Job Created.' })
//     }).catch((err) => {
//       res.status(500).json({ message: 'Something Went Wrong. in body', err: err.code })
//     })
//   } else {
//     res.status(400).json({ message: 'Invalid Data.' })
//   }
// }

// // View a Job-contact
// exports.contactshow = (req, res) => {
//   const { UserId } = res.locals
//   models.Contact.findAll({where:{UserId:UserId,id:req.params.id}}).then((job) => {
//     if (job === null) {
//       res.status(404).json({ message: 'Job Not Found.' })
//       return
//     }

//     res.status(200).json({ message: 'Job Details Fetched.', job })
//   }).catch((err) => {
//     res.status(500).json({ message: "Something Doesn't seem right" ,err:err})
//   })


// }


// // Update a Job-contacts
// exports.updatecontact = (req, res) => {

//   if (!req.body.details) {
//     res.status(204).json({ message: 'No content Provided.' })
//     return
//   }

//   models.Contact.update(
//     req.body.details,
//     { where: { id: req.params.id } },
//   ).then(() => {
//     res.status(200).json({ message: 'Job Updated Successfully!' })
//   }).catch((err) => {
//     res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
//   })
// }

// // Delete an Job-contacts
// exports.destroycontact = (req, res) => {
//   models.Contact.destroy({
//     where: {
//       id: req.params.id,
//     },
//   }).then(() => {
//     res.status(204).json({ message: 'Job Deleted Successfully!' })
//   }).catch((err) => {
//     res.status(400).json({ message: err.errors[0].message })
//   })
// }


