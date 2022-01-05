const express = require('express')
const app = express()
const PORT = process.env.port || 3000
const session = require('express-session')
const routes = require('./routes')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))


app.use(routes)

app.listen(PORT, () => console.log(`I Love U ${PORT}`))