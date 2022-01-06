const {User, Post} = require('../models')
const indonesia = require('indonesia')

class postController{
    static postsHomePage(req, res){
        // User.findOne({
        //     where: {
        //         username: 
        //     }
        // })
        // .then((result) => {
        //     req.render('postHome', {user : result})
        // }).catch((err) => {
        //     console.log(err);
        //     res.send(err)
        // });
        res.render('postHome')
    }

    static addPostinganPage(req, res){
        User.findAll()
        .then((users) => {
            indonesia.getProvinces(prov =>{
                res.render('addpostinganPage', {
                    users,
                    prov
                }) 
            })
        }).catch((err) => {
            res.send(err)
        });
    }

    static addPostinganToDb(req, res){
        Post.create({
            title : req.body.title,
            content : req.body.content,
            imgUrl : req.body.imgUrl,
            location : req.body.location,
            UserId : req.params.userid,
            status : req.body.status,
        })
        .then((result) => {
            res.redirect('/posts/')
        }).catch((err) => {
            req.send('/')
        });
    }



}
module.exports = postController
