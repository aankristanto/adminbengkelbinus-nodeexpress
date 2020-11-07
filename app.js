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
    koneksi.query('SELECT * FROM services INNER JOIN customers ON services.customer_id=customers.customer_id WHERE status="N_A" ', (err, hasil) => {
        if(err) throw err;
        res.render('service-newarrival', {layout: 'user', data: hasil});
    });
});

app.get('/app/service/process', (req,res) => {
    koneksi.query('SELECT * FROM services INNER JOIN customers ON services.customer_id=customers.customer_id WHERE status="PROCESS" ', (err, hasil) => {
        if(err) throw err;
        res.render('service-process', {layout: 'user', data: hasil});
    });
});

app.get('/app/service/close', (req,res) => {
    koneksi.query('SELECT * FROM services INNER JOIN customers ON services.customer_id=customers.customer_id WHERE status="CLOSE" ', (err, hasil) => {
        if(err) throw err;
        res.render('service-close', {layout: 'user', data: hasil});
    });
});

app.get('/app/payment/new', (req,res) => {
    res.render('payment-new', {layout: 'user'});
});

app.get('/app/payment/new/:idservice', (req,res) => {
    res.render('payment-input', {layout: 'user'});
});

app.get('/app/payment/data', (req,res) => {
    res.render('payment-data', {layout: 'user'});
});

// POST input service new
app.post('/app/inputservice', (req, res) => {
    var customername            = req.body.customername;
    var customerphone           = req.body.customerphone;
    var customeraddress         = req.body.customeraddress;
    var customerjeniskendaraan  = req.body.customerjeniskendaraan;
    var customernopol           = req.body.customernopol;
    var customertahunkendaraan  = req.body.customertahunkendaraan;
    var customernorangka        = req.body.customernorangka;
    var customernomesin         = req.body.customernomesin;
    var customerhondanonhonda   = req.body.customerhondanonhonda;
    var customerrequest         = req.body.customerrequest;
    koneksi.query('INSERT INTO customers(customer_name, customer_phone, customer_address) VALUES(?, ?, ?)', 
    [customername, customerphone, customeraddress], (err, hasil) => {
        if(err) throw err;
        koneksi.query('SELECT customer_id FROM customers WHERE customer_name=? AND customer_phone=? AND customer_address=?', 
        [customername, customerphone, customeraddress], (err, hasil1) => {
            if(hasil1.length == 0){
                console.log('kosong')
            } else {
                console.log('customer id found 1');
                var customerid = parseInt(hasil1[0].customer_id);
                koneksi.query('INSERT INTO services(customer_id, jeniskendaraan, nopol, tahunkendaraan, norangka, nomesin, keterangan, date_in, status, merkhonda) VALUES(?, ?, ?, ?, ?, ?, ?, NOW(), "N_A", ?)', 
                [customerid, customerjeniskendaraan, customernopol, customertahunkendaraan, customernorangka, customernomesin, customerrequest, customerhondanonhonda], (err, hasil2) => {
                    if(err) throw err;
                });
                koneksi.query('SELECT id_service FROM services WHERE customer_id=? AND nopol=? AND date_in=NOW()',
                [customerid, customernopol], (err, hasil2) => {
                    if(err) throw err;
                    var idservicenow = parseInt(hasil2[0].id_service);
                    res.redirect('/app/payment/new/' + idservicenow);
                });
            }
        });
    });
});

// handle url not found
app.get('*', (req, res) => {
    res.redirect('/app/dashboard');
});

app.listen(port, () => {
    console.log(`App adminbengkelbinus starting from port ${port}`);
});