module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
   
    personName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    personEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    personNumber: {
      type: DataTypes.BIGINT,
      allowNull: true,
    }
   
    // Expiration Time of the Certi
    // expirationTime: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // }
  })

  Contact.associate = (models) => {
    Contact.belongsTo(models.Job, {
      onDelete: 'CASCADE',
      foreignKey: 'JobId',
      allowNull: true,
      
    })
    Contact.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
      allowNull: true,
      
    })
    
  }

  return Contact
}
