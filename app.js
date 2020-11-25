const express = require('express');
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;


//Define Mongoose Scheema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    age: String
    
});

var Contact = mongoose.model('Contact', contactSchema);
//EXPRESS RELATED WORK
app.use('/static', express.static('static'));//Serving static file
app.use(express.urlencoded())

//PUGS SPECIFIC WORK
app.set('view engine', 'pug');//set template engine as pug
app.set('views', path.join(__dirname, 'views') )//set the view directry

//ENDPOINTS 
app.get('/', (req,res)=>{

    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req,res)=>{

    const params = { }
    res.status(200).render('contact.pug', params);
})


app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to Daatabase")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the atabase")
    })

     //res.status(200).render('contact.pug');
})



//START THE SERVER
app.listen(port, ()=>{

    console.log(`The application started seccessfully on port ${port}`);
})