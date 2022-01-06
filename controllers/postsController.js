const {User, Post, Tag, Post_Tag} = require('../models')
const indonesia = require('indonesia');


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
        let container = {}
        User.findAll()
        //let idMatch = User.getMatchId(result,req.session.user)
        .then((result)=>{
            let match = User.getMatchId(result,req.session.user)
            container.user = match
            return Post.findAll({
                include : [Tag, User]
            })
        })
        .then((result) => {
            // res.send({cek: hasil})
            // console.log(container, container.user[0],container.user[1])
            res.render('postHome', {posts: result, name : req.session.user, id : container.user[0], role : container.user[1] })
        })
        // res.render('postHome')
    }

    static addPostinganPage(req, res){
        Tag.findAll()
        .then((tags) => {
            indonesia.getProvinces(prov => {
                res.render('postJob', {
                    tags : tags,
                    prov : prov,
                    name : req.session.user
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
        console.log(req.params)
        Post.create({
            title : req.body.title,
            content : req.body.content,
            imgUrl : req.body.img,
            location : req.body.location,
            UserId : req.params.id,
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
            console.log(err);
            res.send(err);
        });
    }



}
module.exports = postController