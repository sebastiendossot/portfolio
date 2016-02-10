// Module dependencies.
var application_root = __dirname,
    http = require('http'),
    express = require('express'), //Web framework
    bodyParser  = require('body-parser'),
    nodemailer = require('nodemailer'), //to send emails with node
    mongoose = require('mongoose'), //MongoDB integration
    path = require('path'),
    methodOverride = require('method-override');

var app = express();

var router = express.Router();

var port = process.env.PORT || 9000;


app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/app/'));
app.use(express.static(__dirname + '/app/views'));
app.use(express.static(__dirname + '/app/styles'));  

/*app.use('/contact', function(req,res,next) {
    next();
});*/




/*var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

var db = mongoose.connect('mongodb://localhost/messages');

//Schemas for message if stored into database
var Schema = mongoose.Schema;

var Message = new Schema({
    email: String,
    message: String,
    dateEnvoi : { type: Date, default: Date.now }
})

var MessageModel = mongoose.model('MessageModel', Message);*/

/***** Post message *****/

router.post('/contact', function(req, res, next) {
    var mailOptions = {
        from: req.body.emailContact, //adress of the contact
        to: 'sebastien.dossot@gmail.com', //my adress
        subject: 'Email from your website',
        text: req.body.messageContact
    }
    console.log("ici");
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});

router.get('/contact', function(req, res) {
    res.render('contact', { });
});

router.get('/', function (req, res) {
    //res.sendFile(express.static(__dirname + '/app/index.html'));
    //next();
    res.render('index', { title: 'Express' });
});

app.use(router);


app.listen(port);

console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;   

console.log('App listening on port ' + port);