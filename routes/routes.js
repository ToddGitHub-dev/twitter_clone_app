const {Router} = require('express')
const User = require('../models/User')
const Tweet = require('../models/Tweet')
const matchCredentials = require('../utils')
const router = Router()


let jwt = require('jsonwebtoken')
let token;
let username = ""
let password = ""
router.get('/', verifyToken, function(req, res){
    console.log(typeof token)
    if(typeof token === "undefined"){
        res.render('pages/login')
    }else{
        jwt.verify(req.token, "theSecret", async function(err, authData){
            if(err){
                res.render('pages/login')
            }else{
                let tweets = await Tweet.findAll({include: User})
                let data = {tweets}
            
                res.render('pages/index.ejs', data)
            }
        })
    }
})
router.post('/login', async function(req, res){

    if ((await matchCredentials(req.body)).length > 0) {
        let user = await User.findOne({
            where: {
            username: req.body.username,
            password: req.body.password}
        });
        username = req.body.username
        password = req.body.password
        token = jwt.sign(JSON.stringify(user), "theSecret" ) 
        res.redirect('/home')
    }else{
        res.redirect('/error')
    }    
})

router.get('/logout', function(req, res){
    token = undefined;
    res.redirect('/')
})

User.hasMany(Tweet)
Tweet.belongsTo(User, {foreignKey: 'UserId'})

router.get('/home', verifyToken, async function(req, res) {
    jwt.verify(req.token, "theSecret", async function(err, authData){
        if(err){
            res.sendStatus(403)
        }else{
            let tweets = await Tweet.findAll({include: User})
            let data = {tweets}
        
            res.render('pages/index.ejs', data)
        }
    })
})
router.get('/createUser', function(req, res){
    res.render('pages/createUser')
})

router.post('/createUser', async function(req, res){
    let {username, password} = req.body
    console.log(req.body)
    let user = await User.create({
        username, 
        password
    })
    console.log(user.toJSON())
    res.redirect('/')
})

router.get('/createTweet', function(req, res){
    res.render('pages/createTweet')
})

router.post('/createTweet', async function(req, res){
    let content = req.body.content
    let user = {
        username: username,
        password: password
    }
    if ((await matchCredentials(user)).length > 0) {
        user = await User.findOne({
            where: { username: username,
                password: password }
          })
        let tweet = await Tweet.create({
            content,
            timeCreated: new Date(),
            UserId: user.id
        })                                                                                                                                   
        res.redirect('/home')
    } else {
        res.redirect('/error')
    }
})

router.get("/error", function(req, res){
    let data = {errMsg:"Incorrect Username or Password"}
    res.render('pages/login.ejs', data)
})

// verifyToken

function verifyToken(req, res, next){
    if(typeof token !== "undefined"){
        req.token = token
        next()
    }else{
        next()
    }
}

module.exports = router