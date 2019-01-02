module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
   
    file: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
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

  Document.associate = (models) => {
    Document.belongsTo(models.Job, {
      onDelete: 'CASCADE',
      foreignKey: 'JobId',      
    })
    
  }

  return Document
}
