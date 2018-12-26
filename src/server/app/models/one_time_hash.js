module.exports = (sequelize, DataTypes) => {
  const OneTimeHash = sequelize.define('OneTimeHash', {
    OneTimeHash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expirationTime: DataTypes.DATE,
  })

  OneTimeHash.associate = (models) => {
    OneTimeHash.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    })
  }

  return OneTimeHash
}
