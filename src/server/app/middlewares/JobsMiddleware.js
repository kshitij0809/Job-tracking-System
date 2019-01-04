import models from '../models'

exports.verify = (req, res, next) => {
  var JobId  = req.params.id
  console.log("yes")

  if (!JobId) {
    res.status(404).json({ message: 'Job Not Found.' })
    return
  }

  models.Job.findById(JobId).then((Job) => {
    // Check if Job exists
    if (!Job) {
      res.status(404).json({ message: 'Job Not Found.' })
      return
    }
    console.log("job========<>>>>>",Job.dataValues)

    res.locals.Job = Job.dataValues
    res.locals.JobId = JobId
    next()
  }).catch((err) => {
    res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
  })
}
