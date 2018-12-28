module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'member',
    },
  })

  Member.associate = (models) => {
    Member.hasMany(models.MemberToken)
  }

  return Member
}
