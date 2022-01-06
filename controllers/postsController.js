const {User, Post, Tag, Post_Tag} = require('../models')
const indonesia = require('indonesia');
const user = require('../models/user');

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
        Post.findAll({
                include: [User,Tag]
        })
        .then((result) => {
            // res.send({posts: result})
            res.render('postHome', {posts: result, name : req.session.user})
        })
        // res.render('postHome')
    }

    static addPostinganPage(req, res){
        let error = req.query.err || null
        Tag.findAll()
        .then((tags) => {
            indonesia.getProvinces(prov => {
                res.render('postJob', {
                    tags : tags,
                    prov : prov,
                    name : req.session.user,
                    err : error
                }) 
            })
            // res.send(tags)
        }).catch((err) => {
            console.log(err);
            res.send(err)
        });

        // indonesia.getProvinces(prov =>{
        //     res.render('postJob', {
        //         prov
        //     }) 
        // })
    }

    static addPostinganToDb(req, res){
        Post.create({
            title : req.body.title,
            content : req.body.content,
            imgUrl : req.body.img,
            location : req.body.location,
            UserId : 6,
            status : req.body.status
        }
        )
        .then((result) => {
            return Post_Tag.create({
                TagId : req.body.TagId,
                PostId: result.id
            })
        })
        .then(() => {
            res.redirect('/posts/')
        })
        .catch((err) => {
            res.redirect('/posts/add?err=' + err.message);
        });
    }



}
module.exports = postController