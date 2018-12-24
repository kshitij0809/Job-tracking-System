/* eslint import/no-dynamic-require: 0 */

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

require('dotenv').config()

const env = process.env.NODE_ENV || 'development'

const config = require(path.join(__dirname, '../../db', 'config', 'config.js'))[env]

let sequelize

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, config)
} else {
  sequelize = new Sequelize(config)
}

const db = {}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
