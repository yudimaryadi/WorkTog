const route = require('express').Router()
const routePost = require('./routePost')
const routeUsers = require('./routeUsers')

route.get('/', (req, res)=>{
    res.redirect('/posts')
})

route.use('/users', routeUsers)
route.use('/posts', routePost)

module.exports = route