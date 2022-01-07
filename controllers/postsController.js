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
        JSON.stringify(req.file)
        let img = req.file.path.replace(".", "").replace('.', "").replace(/\//g, "\\").replace('\\', "")

        Post.create({
            title : req.body.title,
            content : req.body.content,
            imgUrl : img,
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



}
module.exports = postController