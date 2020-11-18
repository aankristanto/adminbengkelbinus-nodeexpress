const express       = require('express');
const handlebars    = require('express-handlebars');
const helpers       = require('handlebars-helpers')();
const session       = require('express-session');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const compression   = require('compression');
const mysql         = require('mysql');
const md5           = require('md5');
const async         = require('async');
const { use }       = require('passport');
const excel         = require('excel4node');

const app   = express();
const port  = 8000;

app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.enable('view cache');
app.set('view cache', true);
app.engine('handlebars', handlebars({ 
    layoutsDir: __dirname + '/views/layouts',
    helpers: {
        inc: function(value, options){
            return parseInt(value) + 1;
        },
        dateFormat: function(value, options){
            return Date(value);
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
    koneksi.query("SELECT * FROM services INNER JOIN customers ON services.customer_id=customers.customer_id WHERE services.id_payment='' OR services.id_payment IS NULL AND status='CLOSE' ", (err, hasil) => {
        if(err) throw err;
        res.render('payment-new', {layout: 'user', data: hasil});
    });
});

app.get('/app/payment/new/:idservice', (req,res) => {
    var idservice = req.params.idservice;
    koneksi.query("SELECT * FROM services INNER JOIN customers ON services.customer_id=customers.customer_id WHERE services.id_service=?  ", [idservice], (err, hasil) => {
        if(err) throw err;
        res.render('payment-input', {layout: 'user', data: hasil});
    });
});

app.get('/app/payment/data', (req,res) => {
    koneksi.query("SELECT * FROM payments_data INNER JOIN services ON services.id_service=payments_data.id_service", (err, hasil) => {
        if(err) throw err;
        res.render('payment-data', {layout: 'user', data: hasil});
    });
    
});

app.get('/app/payment/print-receipt/:idservice', (req, res) => {
    var idservice = req.params.idservice;
    koneksi.query("SELECT * FROM payments_data WHERE id_service=? ", [idservice], (err, hasil) => {
        if(err) throw err;
        res.render('payment-receipt', {layout: 'print-receipt', data: hasil});
    });
});

app.get('/app/payment/data/export/:idmerk/:periode', (req, res) => {
    var idmerk = req.params.idmerk;
    var periode = req.params.periode;
    if(idmerk == 0){
        koneksi.query("SELECT * FROM payments_data INNER JOIN services ON services.id_service=payments_data.id_service WHERE merkhonda=0", (err, hasil) => {
            if(err) throw err;
            res.send("Honda");
        });
    } else if(idmerk == 1){
        koneksi.query("SELECT * FROM payments_data INNER JOIN services ON services.id_service=payments_data.id_service WHERE merkhonda=1", (err, hasil) => {
            if(err) throw err;
            res.send("Non Honda");
        });
    } else {
        res.send("DATA INVALID!")
    }
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
        koneksi.query('SELECT customer_id FROM customers WHERE customer_name=? AND customer_phone=? AND customer_address=? LIMIT 1', 
        [customername, customerphone, customeraddress], (err, hasil1) => {
            if(err) throw err;
            console.log('customer id found 1');
            var customerid = parseInt(hasil1[0].customer_id);
            koneksi.query('INSERT INTO services(customer_id, jeniskendaraan, nopol, tahunkendaraan, norangka, nomesin, keterangan, date_in, status, merkhonda) VALUES(?, ?, ?, ?, ?, ?, ?, NOW(), "N_A", ?)', 
                [customerid, customerjeniskendaraan, customernopol, customertahunkendaraan, customernorangka, customernomesin, customerrequest, customerhondanonhonda], (err, hasil2) => {
                    if(err) throw err;
                    koneksi.query('SELECT id_service FROM services WHERE customer_id=? AND nopol=? AND date_in=NOW()',
                    [customerid, customernopol], (err, hasil2) => {
                    if(err) throw err;
                    res.redirect('/app/service/new-arrival');
                });
            });  
        });
    });
});

app.post('/app/set-service-process', (req, res) => {
    var idservice   = req.body.idservice;
    var teknisi     = req.body.inputteknisi;
    koneksi.query("UPDATE services SET technician=?, status='PROCESS' WHERE id_service=?",
        [ teknisi, idservice ], (err, hasil) => {
            if(err) throw err;
            res.redirect('/app/service/process');
        }
    )
});

app.post('/app/set-service-close', (req, res) => {
    var idservice       = req.body.idservice;
    var resolvdetail    = req.body.inputresolv;
    koneksi.query("UPDATE services SET resolving_detail=?, status='CLOSE', date_close=NOW() WHERE id_service=?",
        [resolvdetail, idservice], (err, hasil) => {
            if(err) throw err;
            res.redirect('/app/payment/new/' + idservice);
        }
    )
});

app.post('/app/set-payment', (req, res) => {
    var waktuskrg       = Date.now();
    var idservice       = req.body.inputidservice;
    var detailbayar1    = req.body.inputdetailbayar1 || "";
    var detailbayar2    = req.body.inputdetailbayar2 || "";
    var detailbayar3    = req.body.inputdetailbayar3 || "";
    var detailbayar4    = req.body.inputdetailbayar4 || "";
    var detailbayar5    = req.body.inputdetailbayar5 || "";
    var biayabayar1     = req.body.inputbiayabayar1 || 0;
    var biayabayar2     = req.body.inputbiayabayar2 || 0;
    var biayabayar3     = req.body.inputbiayabayar3 || 0;
    var biayabayar4     = req.body.inputbiayabayar4 || 0;
    var biayabayar5     = req.body.inputbiayabayar5 || 0;
    var totalbiaya      = req.body.inputtotalbiaya;
    var totalbayar      = req.body.inputtotalbayar;
    var totalkembalian  = req.body.inputtotalkembalian;
    var idpayment       = idservice + waktuskrg;
    koneksi.query("INSERT INTO payments_data(id_payment, id_service, barangjasa1, barangjasa2, barangjasa3, barangjasa4, barangjasa5, biaya1, biaya2, biaya3, biaya4, biaya5, totalbiaya, totalbayar, totalkembalian, trx_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, NOW())",
        [ idpayment, idservice, detailbayar1, detailbayar2, detailbayar3, detailbayar4, detailbayar5, biayabayar1, biayabayar2, biayabayar3, biayabayar4, biayabayar5, totalbiaya, totalbayar, totalkembalian],
        (err, hasil) => {
            if(err) throw err;
            koneksi.query("UPDATE services SET id_payment=? WHERE id_service=? AND status='CLOSE' ",
            [ idpayment, idservice], (err, hasil) => {
                    if(err) throw err;
                    if(hasil.length = 0){
                        res.send("Data not found");
                    } else {
                        res.redirect('/app/payment/print-receipt/' + idservice);
                    }
                    
                }
            )
        }
    )
});

// handle url not found and redirect to dashboard
app.get('*', (req, res) => {
    res.redirect('/app/dashboard');
});

app.listen(port, () => {
    console.log(`App adminbengkelbinus starting from port ${port}`);
});
