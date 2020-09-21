require('dotenv').config()

const express = require('express')//express.json ko import kar rahe hai..

const app = express()

const ejs = require('ejs')//import the ejs file....

const path = require('path')//yeh inbuilt module hai.....

const expressLayout = require('express-ejs-layouts')

const PORT = process.env.PORT || 3300

const mongoose = require('mongoose')

const session = require('express-session')

const flash = require('express-flash')

const MongoDbStore = require('connect-mongo') (session)

const passport = require('passport')

const Emitter = require('events')




//Database connection

const url = 'mongodb://localhost/pizza';

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connected.....');
}).catch(err => {
    console.log('connection failed....')
});


//session  store

let mongoStore = new MongoDbStore({

 mongooseConnection: connection,
  collection: 'sessions'
 })

//Event Emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', )


     
//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave :false,
    store: mongoStore,
    saveUninitialized :false,
    cookie:{ maxAge:1000 * 60 * 60 * 24} // 24 hours {jo bhi cookies hai vo 24 hrs tak hi alive hai..}
    
}))

//passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())



app.use(flash())


//assets

app.use(express.static('public'))//jo hamre case mein static hai us folder ka naam likhenge....
app.use(express.urlencoded({ extended: false}))
app.use(express.json())


//Global middleware
app.use((req,res,next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})



// set Template engine....
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))//views kaha pe hai yeh bata rahe temolate engine ko....
app.set('view engine','ejs')//konsa template engine use kar rahe yeh express ko bata rahe hai....

require('./routes/web')(app)

const server = app.listen(PORT, function() { // yaha  pe new javascript ka feature hai....function keyword ki jagah sirf arrow bss...=> aise vala joki bracket k baad lagta hai
    console.log(`listening on port xyz  ${PORT}`)
})

// Socket

const io = require ('socket.io')(server)
io.on('connection',(socket) => {
    // Join 
    socket.on('join',(orderId) => {
        socket.join(orderId)
    })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated',data)
})

eventEmitter.on('orderPlaced', () => {
    io.to('adminRoom').emit('orderPlaced', data)
})