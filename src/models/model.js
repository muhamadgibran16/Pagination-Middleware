const db = require('../config/db')
const Sequelize = require('sequelize')

const { DataTypes } = Sequelize

/** Users Table */
const Users = db.define('user', {
  uid: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  telp: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  ttl: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  }
})

module.exports = { Users }