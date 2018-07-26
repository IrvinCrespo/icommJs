require('dotenv').config()
const fileUpload = require('express-fileupload');
var sockets = require('../sockets/server');
var router = require('../router/routes');
var bodyParser = require('body-parser');
var express = require('express');
var colors = require("colors");
var https = require('https');
var http = require('http');
var fs = require('fs');
var os = require("os");
var ifaces = os.networkInterfaces();
var app = express();



require('events').EventEmitter.prototype._maxListeners = 100;

var cert = process.env.SSL_CRT;
var key = process.env.SSL_KEY;
var hosting_port = process.env.HOSTING_PORT;

var passcert =  process.env.PASS_CRT;
var servHttps;
var servHttp;

var httpsOptions;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(fileUpload());

var io;

router.config(app,express);

function runSockets(){
    var protocol = servHttp || servHttps;
    io = require('socket.io')(protocol, {'pingInterval': 2000, 'pingTimeout': 5000});
    sockets.config(io);
    console.log(colors.yellow("Corriendo servidor de sockets!"));
}

function runSSL(){
    httpsOptions = {
        cert:fs.readFileSync(cert),
        key:fs.readFileSync(key),
        passphrase: passcert 
    }
    servHttps = https.createServer(httpsOptions,app);
    servHttps.listen(hosting_port,function(){
        console.log(colors.green("Server corriendo por el puerto -> "+hosting_port));
    });
}

function run(params){
    servHttp = http.createServer(app);
    servHttp.listen(hosting_port,function(){
        console.log(colors.green("Server corriendo por el puerto -> "+hosting_port));
    });
}

module.exports = {
    runServer:run,
    runServerSSL:runSSL,
    runSocketServer:runSockets
}