var express = require('express')
var app = express()
app.set("view engine", "ejs")
app.use(express.static('public'))
var fs = require('fs')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newdb', { useNewUrlParser: true });

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var bodyParser = require("body-parser")
// var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const TaskSchema = new Schema({
    // id: ObjectId,
    title: String
});

const Task = mongoose.model('Task', TaskSchema);

app.get('/', (req, res) => {
    Task.find({}, (err, docs) => {
        if (err) {
            console.log(err, 'error')
            return
        }

        res.render('todo', { task: tasks, edit: edit })
    })
})

app.post('/', urlencodedParser, (req, res) => {
    switch (req.body.button) {
        
        case 'delete':
            Task.deleteOne({ _id: req.body.id }, function (err) {
                if (err) {
                    console.log(err, 'error')
                    return
                }
                res.redirect('/')
            });
            break
        case 'create':
            let newTask = new Task();
            newTask.title = req.body.title;
            newTask.save(function (err) {
                if (err) {
                    console.log(err, 'error')
                    return
                }
                res.redirect('/')
            });
            break
        case 'save':
            Task.updateOne({ _id: req.body.id }, { title: req.body.title }, function (err, writeOpResult) {
                if (err) {
                    console.log(err, 'error')
                    return
                }
                res.redirect('/')
            });
            break
         case 'edit':
               Task.findById(req.body.id, function (err, doc) {
             if (err) {
            console.log(err, 'error')
                return
           }
           res.render('todo', { edit: true, title: doc.title, id: doc.id })
            });
           break
    }

     res.render('todo', { time: 120 })
})

app.listen(3000, () => {
    console.log("Server is running")
})
