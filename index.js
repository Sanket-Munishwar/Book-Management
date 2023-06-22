const mongoose = require('mongoose')
const express = require('express')
const app = express()
const route = require('./src/routes/route')
const dotenv = require('dotenv')
dotenv.config()
const {PORT, DB_CONNECTION} =process.env


app.use(express.json())

mongoose.set('strictQuery', true)
mongoose.connect(DB_CONNECTION,{
    useNewUrlParser:true
})
.then(()=> console.log("MongoDB database connected......"))
.catch((error)=> console.log(error))

app.use('/',route)

app.listen(PORT, function(){
    console.log('express app is running on '+ PORT)
})

