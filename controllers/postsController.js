const {User, Post, Tag, Post_Tag} = require('../models')
const indonesia = require('indonesia');
const {Op} = require('sequelize')

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
        let title = req.query.search || ""
        let container = {}
        User.findAll()
        //let idMatch = User.getMatchId(result,req.session.user)
        .then((result)=>{
            let match = User.getMatchId(result,req.session.user)
            container.user = match
            return Post.findAll({
                where : {
                    title : {
                        [Op.iLike] : `%${title}%`
                    }
                },include : [Tag, User]                             
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
        let error = req.query.err || ""
        Tag.findAll()
        .then((tags) => {
            indonesia.getProvinces(prov => {
                res.render('postJob', {
                    tags : tags,
                    prov : prov,
                    name : req.session.user,
                    err  : error,
                    id   : req.session.id
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
            res.redirect(`/posts/add/${req.params.id}?err=` + err.message);
        });
    }

    static deletePosts (req, res) {
        console.log(req.params.id)
        Post_Tag.destroy({
            where :{
                PostId: req.params.id
            }
        })
        .then(() => {
            return Post.destroy({
                where : {
                    id: req.params.id
                }
            })
        })
        .then(() => {
            res.redirect('/')
        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
    }
    static editPostsPage(req, res){
        Post.findAll({
            where: {
                id: req.params.id
            }
        })
        .then((posts) => {
            // res.send({name: req.session.user,post : posts})
            res.render('editPostJob', {name: req.session.user, post: posts })
        }).catch((err) => {
            res.send(err)
        })
    }

    static updatePost(req, res){
        Post.update({
            title : req.body.title,
            content : req.body.content,
            imgUrl : req.body.img,
            location : req.body.location,
            status : req.body.status
        },
        {
            where: {
                id : req.params.id
            }
        })
        .then(() => {
            res.redirect('/')
        }).catch((err) => {
            res.redirect(`/posts/edit/${req.params.id}`);
        })
    }


}
module.exports = postController