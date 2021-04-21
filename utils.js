/*
utilities file
(i didn't want to clutter the main app.js)
*/
let match = async function matchCredentials(requestBody) { 
    const User = require('./models/User')
    let user = await User.findAll({
        where:{
            username: requestBody.username,
            password: requestBody.password
        }
    })
    console.log(user)
    if (user.length > 0) {
        return user
    } else {
        return ""
    }
}
module.exports = match