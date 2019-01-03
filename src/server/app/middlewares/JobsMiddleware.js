import models from '../models'

exports.verify = (req, res, next) => {
  const { JobId } = req.params

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

    res.locals.Job = Job
    next()
  }).catch((err) => {
    res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
  })
}
