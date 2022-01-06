const {User, Post} = require('../models')
const indonesia = require('indonesia')
const { comparePassword } = require('../helpers/bcrypt')

class usersController{
    static userLoginPage(req, res){
        let error = req.query.err || null
        res.render('login', {error})
    }

    static userLogin(req, res){
        User.findOne({
            where:{
                username : req.body.username
            }
        })
        .then((user) => {
            if (user && comparePassword(req.body.password, user.password)){
                req.session.user = user.username
                res.redirect("/")
            }
            else {
                throw new Error ('username/password salah')
            }
        }).catch((err) => {
            res.redirect('/users/login?err=' + err.message)
        });
    }

    static userRegisterPage(req, res){
        res.render('register')
    }

    static createUserToDb(req, res){
        User.create({
            username: req.body.username,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            email: req.body.email,
            password: req.body.password,
            rote: req.body.role
        })
        .then((result) => {
            res.redirect('/')
        }).catch((err) => {
            console.log(err.message);
            res.send(err.message)
        });
    }

    static logout(req, res){
        req.session.destroy(err=>{
            if(err) res.send(err)
            res.redirect("/users/login")
        })
    }


}
module.exports = usersController
