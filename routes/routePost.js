const express = require ('express')
const routePost = express.Router()
const postController = require('../controllers/postsController');
const multer  = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

// routePost.use(express.static(__dirname));
routePost.use('/add/:id', express.static('./uploads'));

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/

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
routePost.post('/add/:id',upload.single('img'), postController.addPostinganToDb)
routePost.get('/delete/:id',postController.deletePosts)
routePost.get('/edit/:id',postController.editPostsPage)
routePost.post('/edit/:id',postController.updatePost)





module.exports =  routePost