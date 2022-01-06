const express = require('express')
const app = express()
const route = require('./routes/indexRoutes')
const session = require('express-session')
const port = 3000


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.locals.formatDate = require('./helpers/formatDate')


app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000
    }
}))


app.use('/', route)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})