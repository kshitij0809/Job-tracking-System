import models from '../../models'

exports.details = (req, res) => {
  models.Member.findOne({
    where: { id: res.locals.MemberId },
    attributes: ['id', 'email', 'role'],
  }).then((member) => {
    if (!member) {
      res.send(404).json({ message: 'Member Not found.' })
    } else {
      res.status(200).json({ message: 'Member Fetched Successfully.', member })
    }
  }).catch((err) => {
    res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
  })
}
