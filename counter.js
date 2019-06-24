var express = require('express')
var bodyParser= require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended:false})
var app= express()


app.set("view engine",'ejs')

console.log("server has started")


app.get('/',(req,res)=>{
   
    res.render('counter',{number: 0})
    console.log(req.query)

})

app.post('/',urlencodedParser,(req,res)=>{

    let number=Number(req.body.number||-1)+1
    res.render('counter',{number: number})

})



app.listen(3000)