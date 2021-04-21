const {Model, DataTypes} = require('sequelize')
const sequelize = require('../db.js')

class User extends Model{}
User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, {sequelize})
User.sync({force: true})

async ()=>{
    await sequelize.sync()
}

module.exports = User