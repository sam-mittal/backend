var express = require('express')
var bodyParser= require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended:false})
var app= express()


app.set("view engine",'ejs')

console.log("server has started")


app.get('/',(req,res)=>{
   
    res.render('counter1',{number: 0})
    

})

app.post('/',urlencodedParser,(req,res)=>{

    let number=Number(req.body.number||-1)
    if(req.body.i=='increase'){
        number=number+1
    }
    else{
        number=number-1
    }

    res.render('counter1',{number: number})

})



app.listen(3000)