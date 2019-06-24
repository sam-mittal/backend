var express = require('express')
var app = express()

var middleware = (req,res,next)=>{
    console.log("middleware")
    next()
}


app.get("/",middleware,(req,res)=>{
    console.log("i am a get request")
    res.send("hello")
})


app.listen(3000)