var express = require('express')
var app = express()
app.set("view engine",'ejs')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newdb',{useNewUrlParser: true});


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended: false})

const recordSchema = new Schema({
    name: String,
    attendence: Boolean
});

const record = mongoose.model('record', recordSchema);
app.get('/',(req,res)=>{
    record.find({},(err,docs)=>{
        if(err){
            console.log(err,'error')
            return
        }
        res.render('form',{record: docs, edit:false})
    })
})
app.post('/',urlencodedParser,(req,res)=>{
    switch(req.body.button){
        case 'delete': 
        record.deleteOne({ _id: req.body.id },function(err){
            if(err){
                console.log(err,'error')
            }
            res.redirect('/')
        });
        break;
        case 'create':
            let newRecord = new record();
            newRecord.name = req.body.name;
            newRecord.attendence = req.body.attendence;
            newRecord.save(function(err){
                if(err){
                    console.log(err,'error')
                    return
                }
                res.redirect('/')
            });
            break
        case 'save':
            record.updateOne({_id: req.body.id},{name: req.body.name}, function(err, writeOpResult){
                if(err){
                    console.log(err,'error')
                    return
                }
                res.redirect('/')
            }); 
            break
        case 'edit':
            record.findById(req.body.id, function (err, doc) {
                if (err) {
               console.log(err, 'error')
                   return
              }
              res.render('form', { edit: true, name: doc.name, id: doc.id })
               });
              break
    }
    res.render('todo',{time: 120})
})

app.listen(3000,()=>{
    console.log("server has started")
})














