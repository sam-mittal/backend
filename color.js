var express = require('express')
var bodyParser= require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended:false})
var app= express()


app.set("view engine",'ejs')

console.log("server has started")


app.get('/',(req,res)=>{
   
    res.render('color',{color: "black"})
    

})

app.post('/',urlencodedParser,(req,res)=>{

    let color=req.body.color||"black"
    if(req.body.r=='red'){
        color = "red";
    }
    else if(req.body.b=='blue'){
        color = "blue";
    }
    else{
        color = "green";
    }

    res.render('color',{color: color})

})



app.listen(3000)