const routeUsers = require('express').Router()
const usersController = require('../controllers/usersController')
const routePost = require('./routePost')


routeUsers.get('/login', usersController.userLoginPage)
routeUsers.post('/login', usersController.userLogin)

routeUsers.get('/register', usersController.userRegisterPage)
routeUsers.post('/register', usersController.createUserToDb)

routeUsers.get('/logout', usersController.logout)

module.exports = routeUsers