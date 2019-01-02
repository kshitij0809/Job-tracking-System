module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT(),  
    company: DataTypes.STRING,
    abstract: DataTypes.BOOLEAN, // abstract is needed or not
    field: DataTypes.STRING, // centerstage | departmental | workshop   
    workType: DataTypes.JSON, // an array of objects with key as the fulltime/parttime/remote/internship.
    location: DataTypes.STRING,
    nextStepDue: DataTypes.DATE, //   store as many    
  })

  Job.associate = (models) => {
    Job.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
      allowNull: true,
    })    
    Job.belongsToMany(models.User, { through: 'TotalJobs', foreignKey: 'JobId' })
    Job.hasMany(models.Contact)
    Job.hasMany(models.Document)
    Job.hasMany(models.Stages)
    Job.hasMany(models.Note)
  }

  return Job
}
