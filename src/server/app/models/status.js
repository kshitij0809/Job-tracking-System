module.exports = (sequelize, DataTypes) => {
  const Stages = sequelize.define('Stages', {
   




// intrested: {
//       type: DataTypes.ENUM,
//       values: [
//               'applied',
//               'unintersted'
//     ]
//     },
//     applied: {
//       type: DataTypes.ENUM,
//       values: [
//               'followedUp',
//               'gotInterview',
//               'offerRejected',
//               'unintersted'
//     ]
//     },
//     followedUp: {
//       type: DataTypes.ENUM,
//       values: [
//               'followedUpAgain',
//               'gotInterview',
//               'offer',
//               'offerRejected',
//               'unintersted'
//     ]
//     },
//     gotInterview: {
//       type: DataTypes.ENUM,
//       values: [

//               'interviewed',
//               'unintersted'
//     ]
//     },
//     interviewed: {
//       type: DataTypes.ENUM,
//       values: [
//               'gotInterviewAgain',
//               'offer',
//               'unintersted'
//     ]
//     },


    status:{
      type:DataTypes.ENUM,
      values:[
                'applied',
                'followedUp',
                'unintersted',
                'followedUpAgain',
                'gotInterview',
                'interviewed',
                'gotInterviewAgain',
                'offer',
                'offerAccepted',
                'offerRejected'
      ]

    },
  
    // Expiration Time of the Certi
    // expirationTime: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // }
  })

  Stages.associate = (models) => {
    Stages.belongsTo(models.Job, {
      onDelete: 'CASCADE',
      foreignKey: 'JobId',      
    })
    Stages.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
      allowNull: true,
      
    })
    
    
  }

  return Stages
}

















