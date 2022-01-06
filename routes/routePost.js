const routePost = require ('express').Router()
const postController = require('../controllers/postsController');

const multer  = require('multer')
const upload = multer({ dest: '../dataImg_upload' })




const middle1 = (req, res, next) => {
    // console.log('hello from middle1');
    console.log(req.session);
    next()
//     if (req.session.user) {
//         next()
//     } else {
//         res.redirect('/users/login')
//     }
}

routePost.get('/', postController.postsHomePage)
routePost.get('/add', postController.addPostinganPage)
routePost.post('/add', postController.addPostinganToDb)
// routePost.post('/add', upload.single('uploaded_file'), (req ,res)=>{
//     console.log(req.file, req.body)
//     res.send(req.file)
// })




module.exports =  routePost