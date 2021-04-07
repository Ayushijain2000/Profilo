const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Register_Form', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// app.use(express.static('static'));
app.use('/static' , express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

const FormSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    gender: String,
    proff: String
  });

  var form = mongoose.model('form', FormSchema);


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/contact' , (req, res)=>{
    res.sendFile(path.join(__dirname + '/views/contact.html'))
})

app.post('/fillForm' , (req, res)=>{
    var myData = new form(req.body);
    myData.save()
    .then(item => {
        res.send("Congratulations, You Have Been Registered at Profilo!");
    })
    .catch(err => {
        res.status(400).send("You were not registered , pls try Again");
    });
});

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});


