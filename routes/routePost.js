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
routePost.get('/add/:id',middle1, postController.addPostinganPage)
routePost.post('/add/:id', postController.addPostinganToDb)
routePost.get('/delete/:id',postController.deletePosts)
routePost.get('/edit/:id',postController.editPostsPage)
routePost.post('/edit/:id',postController.updatePost)





module.exports =  routePost