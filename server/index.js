const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
//const bodyParser = require('body-parser')
//const cookieParser = require('cookie-parser')
//const session = require('express-session')
//const mongoose = require('mongoose')
//const dotenv =require('dotenv')
const app = express()
const routesURLS = require('./routes/routes')


//dotenv.config()
//mongoose.connect(process.env.DATABASE_ACCESS, () => {console.log('database connected..')})


app.use(express.json())
app.use(cors())

/*app.use(cors({
    origin:["http://localhost:4000"],
    methods: ["GET", "POST"],
    credentials: true,
}))
app.use(cookieParser())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
//cookie session 
app.use(session({
    key: "userId",
    secret: "Lovestrant",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}))
*/

app.use('/app',routesURLS)


app.listen(4000, () =>{
    console.log('server running..')
})