const routePost = require ('express').Router()
const postController = require('../controllers/postsController');

const middle1 = (req, res, next) => {
    // console.log('hello from middle1')
    if (req.session.user) {
        next()
    } else {
        res.redirect('/users/login')
    }
}

routePost.get('/',middle1, postController.postsHomePage)
routePost.get('/add',middle1, postController.addPostinganPage)
routePost.post('/add', postController.addPostinganToDb)





module.exports =  routePost