var express = require('express')
var app = express()
const mongoose = require('mongoose');
 
 
mongoose.connect('mongodb://localhost/newdb', {useNewUrlParser: true});

const Schema = mongoose.Schema
var studentSchema = new Schema({
    name: String,
    age: Number,
    present: Boolean
});

const studentModel = mongoose.model("Student",studentSchema)

app.get("/",(req,res)=>{
    var studentInstance = studentModel()
    studentInstance.name = "Pooja"
    studentInstance.age = 19
    studentInstance.present = false


    studentInstance.save(function(err){
        if(err){
            console.log(err)
        }
    })
    res.send("done")

})

studentModel.find({},(err,docs)=>{
    console.log(docs)
})


app.listen(3000)