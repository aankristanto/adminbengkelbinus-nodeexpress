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
    res.render('landing-page', {layout: 'index'});
});

// route to app client

app.get('/app/login', (req, res) =>{
    session = req.session;
    console.log(session);
    if(session.user){
        res.redirect('/app/dashboard');
    } else {
        res.render('app/login', {
            layout: 'index',
            titlepage: 'Login - App Afiliate SMK Bina Nusantara Semarang'
        });
    }
});

app.get('/app/loginfailed', (req, res) => {
    session = req.session;
    console.log(session);
    if(session.user){
        res.redirect('/app/dashboard');
    } else {
        res.render('app/loginfailed', {
            layout: 'index',
            titlepage: 'Login - App Afiliate SMK Bina Nusantara Semarang'
        });
    }
});

app.post('/app/auth', (req, res) => {
    var usernames = req.body.username;
    var passwords = md5(req.body.password);
    if(usernames && passwords){
        koneksi.query('SELECT * FROM tbl_users WHERE s_username = ? AND  s_password = ? AND s_level = "SISWA"', [usernames, passwords], (error, hasil) => {
            if(hasil.length > 0){
                console.log(hasil);
                req.session.loggedin = true;
                    req.session.user = {
                        username: usernames,
                        level: 'SISWA'
                    };
                    console.log('username ' + req.session.user.username + ' is login');
                    console.log("Session Before Redirect: ", req.session);
                    res.redirect('/app/dashboard');
            } else {
                console.log('username ' + usernames + ' with password ' + passwords + ' is failed to login');
                res.redirect('/app/loginfailed');
            }
        });
    } else {
        res.send('Please enter Username and Password!');
		res.end();
    }
});

app.get('/app/dashboard', (req, res) => {
    session = req.session;
    console.log(session);
    if(session.user){
        var username = session.user.username;
        var sqlprofile = koneksi.query('SELECT * FROM tbl_users WHERE s_username = ?', username, (err, hasil)=> {
            if(err) throw err;
            res.render('app/dashboard', {
                layout: 'index', 
                titlepage: 'Dashboard - App Afiliate SMK Bina Nusantara Semarang',
                hasil: hasil});
        });
    } else {
        res.redirect('/app/login');
    }
});


app.listen(port, () => {
    console.log(`App adminbengkelbinus starting from port ${port}`);
});