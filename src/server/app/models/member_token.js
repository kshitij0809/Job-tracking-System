module.exports = (sequelize, DataTypes) => {
  const MemberToken = sequelize.define('MemberToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expirationTime: DataTypes.DATE,
    userAgent: {
      type: DataTypes.STRING,
    },
    ip: {
      type: DataTypes.STRING,
    },
  })

  MemberToken.associate = (models) => {
    MemberToken.belongsTo(models.Member, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    })
  }

  return MemberToken
}
