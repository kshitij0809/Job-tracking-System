module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT(),  
    company: DataTypes.STRING,
    url: DataTypes.STRING, 
    workType: {
      type: DataTypes.ENUM,
      values: ['fulltime','parttime','remote','internship']  
    }, // an array of objects with key as the fulltime/parttime/remote/internship.
    location: DataTypes.STRING,
    nextStepDue: {
      type:DataTypes.DATE,
      allowNull: false
    },
    active: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    },  
  })
  // console.log(Job)

  Job.associate = (models) => {
    Job.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
      allowNull: false,
    })    
    Job.belongsToMany(models.User, { through: 'TotalJobs', foreignKey: 'JobId' })
    Job.hasMany(models.Contact)
    Job.hasMany(models.Document)
    Job.hasMany(models.Stages)
    Job.hasMany(models.Note)
  }

  return Job
}


// {
//     "title":"developer",
//     "description":"developerdeveloperdeveloperdeveloperdeveloperdeveloperdeveloperdeveloperdeveloperdeveloperdeveloper",
//     "company":"stockroom",
//     "url":"wwww.stockroom.io/job/developer",
//     "workType":"fulltime",
//     "location":"banglore",
//     "nextStepDue":""}
