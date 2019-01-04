import models from '../models'

exports.verify = (req, res, next) => {
  var JobId  = req.params.id
  const { UserId } = res.locals
  console.log("yefffs",UserId,JobId)

  if (!JobId) {
    res.status(404).json({ message: 'Job Not Found.' })
    return
  }

  models.Job.findOne({where:{UserId:UserId,id:JobId}}).then((Job) => {
    // Check if Job exists
    if (!Job) {
      res.status(404).json({ message: 'Job Not Found.' })
      return
    }

    res.locals.Job = Job.dataValues
    res.locals.JobId = JobId
    next()
  }).catch((err) => {
    res.status(500).json({ message: 'Something Went Wrong.', err: err})
  })
}
