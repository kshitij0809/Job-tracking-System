module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'end_user',
    },
    accessToken: DataTypes.STRING,
    expiresIn: DataTypes.BIGINT,
    oauthId: DataTypes.DECIMAL,
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
})

  User.associate = (models) => {
    User.hasMany(models.Token)
    // User.hasMany(models.Payments)
    // User.belongsToMany(models.Team, { through: 'UserTeam', foreignKey: 'UserId' })
    // User.belongsToMany(models.Event, { through: 'CoordiEvents', foreignKey: 'UserId' })
    // User.hasMany(models.Team, { foreignKey: 'LeaderId' })
    // User.hasMany(models.Uploads, { foreignKey: 'UserId' })
    // User.hasMany(models.UsedReferalCodes)
    // User.hasMany(models.PasswordReset)
    // User.hasMany(models.UserExpanseEvent)
    // User.hasMany(models.SeenNotification)
    User.hasMany(models.OneTimeHash, { foreignKey: 'UserId' })
    // User.hasMany(models.Certificate, { as: 'Certificates', foreignKey: 'UserId' })
  }

  return User
}
