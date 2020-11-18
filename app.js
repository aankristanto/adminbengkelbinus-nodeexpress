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
var excel         = require('excel4node');

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


// LOGIN PAGE
app.get('/', (req,res) => {
    res.render('landing', {layout: 'index'});
});

// SHOW DASHBOARD
app.get('/app/dashboard', (req,res) => {
    res.render('dashboard', {layout: 'user'});
});

//SHOW PAGE INPUT NEW SERVICE
app.get('/app/service/new', (req,res) => {
    res.render('service-new', {layout: 'user'});
});

// SHOW DATA SERVICE NEW ARRIVAL
app.get('/app/service/new-arrival', (req,res) => {
    koneksi.query('SELECT * FROM services INNER JOIN customers ON services.customer_id=customers.customer_id WHERE status="N_A" ', (err, hasil) => {
        if(err) throw err;
        res.render('service-newarrival', {layout: 'user', data: hasil});
    });
});

// SHOW DATA SERVICE PROCESS
app.get('/app/service/process', (req,res) => {
    koneksi.query('SELECT * FROM services INNER JOIN customers ON services.customer_id=customers.customer_id WHERE status="PROCESS" ', (err, hasil) => {
        if(err) throw err;
        res.render('service-process', {layout: 'user', data: hasil});
    });
});

// SHOW DATA SERVICE CLOSE
app.get('/app/service/close', (req,res) => {
    koneksi.query('SELECT * FROM services INNER JOIN customers ON services.customer_id=customers.customer_id WHERE status="CLOSE" ', (err, hasil) => {
        if(err) throw err;
        res.render('service-close', {layout: 'user', data: hasil});
    });
});

// NEW PAYMENT PAGE
app.get('/app/payment/new', (req,res) => {
    koneksi.query("SELECT * FROM services INNER JOIN customers ON services.customer_id=customers.customer_id WHERE services.id_payment='' OR services.id_payment IS NULL AND status='CLOSE' ", (err, hasil) => {
        if(err) throw err;
        res.render('payment-new', {layout: 'user', data: hasil});
    });
});

// SET NEW PAYMENT BASED ON ID SERVICE
app.get('/app/payment/new/:idservice', (req,res) => {
    var idservice = req.params.idservice;
    koneksi.query("SELECT * FROM services INNER JOIN customers ON services.customer_id=customers.customer_id WHERE services.id_service=?  ", [idservice], (err, hasil) => {
        if(err) throw err;
        res.render('payment-input', {layout: 'user', data: hasil});
    });
});

// SHOW DATA PAYMENT
app.get('/app/payment/data', (req,res) => {
    koneksi.query("SELECT * FROM payments_data INNER JOIN services ON services.id_service=payments_data.id_service", (err, hasil) => {
        if(err) throw err;
        res.render('payment-data', {layout: 'user', data: hasil});
    });
    
});

// PRINT RECEIPT PAYMENT
app.get('/app/payment/print-receipt/:idservice', (req, res) => {
    var idservice = req.params.idservice;
    koneksi.query("SELECT * FROM payments_data WHERE id_service=? ", [idservice], (err, hasil) => {
        if(err) throw err;
        res.render('payment-receipt', {layout: 'print-receipt', data: hasil});
    });
});

// POST LOGIN USER


// INPUT NEW SERVICE AND SET STATUS TO N_A
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

// SET SERVICE STATUS TO PROCESS
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

// SET SERVICE STATUS TO CLOSE
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

app.post('/app/payment/data/export', (req, res) => {
    var periode1    = req.body.inputperiode1;
    var periode2    = req.body.inputperiode2;
    koneksi.query("SELECT * FROM payments_data INNER JOIN services ON services.id_service=payments_data.id_service WHERE trx_date BETWEEN ? AND ? AND status='CLOSE'",
    [periode1, periode2], (err, hasil) => {
        if(err) throw err;
        var data1 = JSON.parse(JSON.stringify(hasil));
        //console.log(data1[0].totalbayar);
        //res.json(hasil);
        console.log(data1.length);
        var workbook = new excel.Workbook();
        var worksheet = workbook.addWorksheet('Honda');
        var style = workbook.createStyle({
            font: {
              color: '#FF0800',
              size: 12
            }
        });
        worksheet.cell(1,1).string('REPORT PAYMENT - PERIODE' + periode1 + ' TO ' + periode2).style(style);
        worksheet.cell(2,1).string('NO').style(style);
        worksheet.cell(2,2).string('ID SERVICE').style(style);
        worksheet.cell(2,3).string('ID PAYMENT').style(style);
        worksheet.cell(2,4).string('ID CUSTOMER').style(style);;
        worksheet.cell(2,5).string('TOTAL BIAYA').style(style);
        worksheet.cell(2,6).string('TOTAL BAYAR').style(style);
        worksheet.cell(2,7).string('TOTAL KEMBALIAN').style(style);
        for (i = 0; i < data1.length; i++) {
            var cellrow             = i + 3;
            var cellidservice       = data1[i].id_service || 0;
            var cellidpayment       = data1[i].id_payment || 0;
            var cellcustomerid      = data1[i].customer_id || 0;
            var celltotalbiaya      = data1[i].totalbiaya || 0;
            var celltotalbayar      = data1[i].totalbayar || 0;
            var celltotalkembalian  = data1[i].totalkembalian || 0;
            worksheet.cell(cellrow,1).number(i).style(style);
            worksheet.cell(cellrow,2).number(cellidservice).style(style);
            worksheet.cell(cellrow,3).string(cellidpayment).style(style);
            worksheet.cell(cellrow,4).string(cellcustomerid).style(style);
            worksheet.cell(cellrow,5).number(celltotalbiaya).style(style);
            worksheet.cell(cellrow,6).number(celltotalbayar).style(style);
            worksheet.cell(cellrow,7).number(celltotalkembalian).style(style);
        }
        workbook.write('REPORT-PAYMENT.xlsx');
        res.sendFile( __dirname + '/REPORT-PAYMENT.xlsx')
    });
});

// handle url not found and redirect to dashboard
app.get('*', (req, res) => {
    res.redirect('/app/dashboard');
});

app.listen(port, () => {
    console.log(`App adminbengkelbinus starting from port ${port}`);
});
