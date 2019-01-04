import models from '../models'

exports.verify = (req, res, next) => {
  const JobId  = req.params.JobId
  const { UserId } = res.locals
  // console.log("yefffs",req.params,UserId)

  if (!JobId) {
    res.status(404).json({ message: 'Job Not Found.' })
    return
  }

  models.Job.findOne({where:{UserId:UserId,id:JobId}}).then((Job) => {
    // Check if Job exists
    if (!Job) {
      res.status(404).json({ message: 'Job Not Found.kkkk' })
      return
    }

    res.locals.Job = Job.dataValues
    res.locals.JobId = JobId
    next()
  }).catch((err) => {
    res.status(500).json({ message: 'Something Went Wrong.', err: err})
  })
}
