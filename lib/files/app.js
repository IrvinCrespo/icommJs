require('dotenv').config()
const fileUpload = require('express-fileupload');
var sockets = require('../sockets/server');
var router = require('../router/routes');
var bodyParser = require('body-parser');
const cluster = require('cluster');
var express = require('express');
var colors = require("colors");
var https = require('https');
var http = require('http');
var debug = require('ic-debugger');
var fs = require('fs');
var os = require("os");
const numCPUs = os.cpus().length;
var ifaces = os.networkInterfaces();
var app = express();
var workers = 0;



var msg = "";


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
    io = require('socket.io')(protocol, {
        allowUpgrades: true,
        transports: ['websocket', 'flashsocket', 'polling'],
        'log level': 1,
        'pingInterval': 80000,
        'pingTimeout': 25000
        });
    sockets.config(io);
    console.log(colors.yellow("Corriendo servidor de sockets! - pid -> "+process.pid));
    
}


async function runSSL(){
    httpsOptions = {
        cert:fs.readFileSync(cert),
        key:fs.readFileSync(key),
        passphrase: passcert 
    }
    servHttps = https.createServer(httpsOptions,app);
    let msg = await new Promise((result,reject)=>{
        servHttps.listen(hosting_port,function(){
            result("Server corriendo por el puerto -> "+hosting_port+" - pid -> "+process.pid)
        });
        servHttps.on("error",function(error){
            reject(error)
        })

    }).then(res=>{
        return res
    },error=>{
        return error
    }).catch(error=>{
        
    });
    console.log(colors.green(msg));
}

async function run(params){
    //clustering();
    servHttp = http.createServer(app);
    let msg = await new Promise((result,reject)=>{
        servHttp.listen(hosting_port,function(){
            result("Server corriendo por el puerto -> "+hosting_port+" - pid -> "+process.pid)
        });
        servHttp.on("error",function(error){
            reject(error)
        })

    }).then(res=>{
        return res
    },error=>{
        return error
    }).catch(error=>{

    });
    console.log(colors.green(msg));
}

function startCluster(){
    clustering();
}

function clustering(){
      
    if (cluster.isMaster) {
        console.log("Cluster: ",cluster.isMaster?"Master":"Worker"," process "+process.pid);
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
        
        cluster.on('exit', (worker, code, signal) => {
          console.log(`worker ${worker.process.pid} died`);
        });
    } else {
        run();
        console.log("Cluster: ",cluster.isMaster?"Master":"Worker"," process "+process.pid);
    }
    
    
}

module.exports = {
    runServer:run,
    runServerSSL:runSSL,
    runSocketServer:runSockets,
    clustering:startCluster
}