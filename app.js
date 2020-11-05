var express = require('express');
var app = express();
var port = 3000;
var handlebars = require('express-handlebars');
var helpers = require('handlebars-helpers')();
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var compression = require('compression');
var mysql = require('mysql');
var md5 = require('md5');
var {check, validationResult } = require('express-validator');
var async = require('async');
const { use } = require('passport');


app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.enable('view cache');
app.set('view cache', true);
app.engine('handlebars', handlebars({ 
    layoutsDir: __dirname + '/views/layouts',
    helpers: {
        inc: function(value, options){
            return parseInt(value) + 1;
        }
    }
}));
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

//START - configure connection to database
var koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'aankristanto1',
    password: '082234725445',
    database: 'adminbengkelbinus'
});
koneksi.connect((err) => {
    if(err) throw err;
    console.log("Database Connected");
});
//END - configure connection to database

// START - configure login using express-session
app.use(session({
    name: 'AFILIATESESSION',
    secret: 'hastalavista',
    saveUninitialized: true,
    resave: false,
    cookie: {secure: false}
}));
// END - configure login using express-session



app.get('/', (req,res) => {
    res.render('landing', {layout: 'index'});
});

app.get('/app/dashboard', (req,res) => {
    res.render('dashboard', {layout: 'user'});
});

app.get('/app/service/new', (req,res) => {
    res.render('service-new', {layout: 'user'});
});

app.get('/app/service/data', (req,res) => {
    res.render('service-data', {layout: 'user'});
});

app.get('/app/service/new-arrival', (req,res) => {
    res.render('service-newarrival', {layout: 'user'});
});

app.get('/app/service/process', (req,res) => {
    res.render('service-process', {layout: 'user'});
});

app.get('/app/service/close', (req,res) => {
    res.render('service-close', {layout: 'user'});
});

app.get('/app/payment/new', (req,res) => {
    res.render('payment-new', {layout: 'user'});
});

app.get('/app/payment/data', (req,res) => {
    res.render('payment-data', {layout: 'user'});
});

/*
app.post('/app/inputservice', (req, res) => {
    const csname = req.body.customername;
    koneksi.query("INSERT INTO service(customer_name) VALUES(?)", [csname] , (err, hasil) => {
        if(err) throw err;
        res.send("input data berhasil");
    });
});
*/

app.listen(port, () => {
    console.log(`App adminbengkelbinus starting from port ${port}`);
});