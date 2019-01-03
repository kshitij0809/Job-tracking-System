module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
   
    noteDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },   
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
   
    // Expiration Time of the Certi
    // expirationTime: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // }
  })

  Note.associate = (models) => {
    Note.belongsTo(models.Job, {
      onDelete: 'CASCADE',
      foreignKey: 'JobId',      
    })
    Note.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
      allowNull: true,
      
    })
    
  }

  return Note
}
