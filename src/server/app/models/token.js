module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expirationTime: DataTypes.DATE,
  })

  Token.associate = (models) => {
    Token.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    })
  }

  return Token
}
