const {Model, DataTypes} = require('sequelize')
const sequelize = require('../db.js')

class Tweet extends Model {}
Tweet.init({
   content: DataTypes.STRING,
   timeCreated: DataTypes.DATE,
   UserId: DataTypes.INTEGER
}, { sequelize });

Tweet.sync({force: true})

async ()=>{
    await sequelize.sync()
}

module.exports = Tweet