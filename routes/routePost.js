const routePost = require ('express').Router()

routePost.get('/', (req, res)=>{
    res.send("masuk ke beranda post")
})

module.exports =  routePost