// npm i express-handlebars
const express = require('express') 
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')

const pageRouter = require('./router/page')
const carsRouter = require('./router/cars')
const usersRouter = require('./router/users')
const tasksRouter = require('./router/task')
const varMid = require('./middleware/var')
const authRouter  = require('./router/auth')
const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')
app.use(express.urlencoded({extended:true})) 
app.use(express.static('public'))

// !
app.use(session({
    secret: 'some secret key',
    saveUninitialized:false,
    resave:false,
}))
app.use(varMid)


app.use(pageRouter)
app.use('/cars',carsRouter) 
app.use('/tasks',tasksRouter) 
app.use('/users',usersRouter) 
app.use('/auth',authRouter) 
async function dev(){
    try {
        const url = 'mongodb://127.0.0.1:27017/cars'
        await mongoose.connect(url,{useNewUrlParser:true})
        app.listen(3000,()=>{
            console.log('Server is running')
        })
    } catch (error) {
        console.log(error)
    }
}

dev()


// c:\data\db
// 1-terminal
// cd c:\mongodb\bin
// mongod --dbpath c:\data\db

// 2-terminal
// cd c:\mongodb\bin
// mongo 
