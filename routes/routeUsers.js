const routeUsers = require('express').Router()
const usersController = require('../controllers/usersController')


routeUsers.get('/login', usersController.userLoginPage)
routeUsers.post('/login', usersController.userLogin)

routeUsers.get('/register', usersController.userRegisterPage)
routeUsers.post('/register', usersController.createUserToDb)

module.exports = routeUsers