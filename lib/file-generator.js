var fs = require('file-system');
var colors = require('colors')
//checa si existe el directorio
function checkDirectorySync(directory) {  
    try {
      fs.statSync(directory);
    } catch(e) {
      fs.mkdirSync(directory);
    }
  }

function appendToFile(file,content){
  fs.appendFile(file,content, function (err) {
    if (err) throw err;
    //console.log('');
  });
}

  function createDirectory(){
    checkDirectorySync("./Controllers");  
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function createController(name){
    checkDirectorySync("./Controllers");
    var strUp = capitalizeFirstLetter(name);
    var con = "var mongoose = require('icomm-mongo').mongoose;\n\
    var socketio = require('../sockets/server').io\n\
var Schema = mongoose.Schema, ObjectId = mongoose.Types.ObjectId;\n\
\n\
module.exports = class "+strUp+"Controller{\n\
  \n\
    constructor(){\n\
      \n\
    }\n\
    \n\
    async upload(req,res,next){\n\
        if (!req.files)\n\
            return res.status(400).send('No se subio archivo!');\n\
            \n\
        let sampleFile = req.files.sampleFile;\n\
        sampleFile.mv('/ruta/hacia/carpeta/archivos/filename.jpg', function(err) {\n\
            if (err)\n\
                return res.status(500).json(err);\n\
            res.res.status(200).json({message:'archivo subido!'});\n\
        });\n\
    }\n\
    \n\
    async update(req,res,next){\n\
      \n\
    }\n\
    \n\
    async create(req,res,next) {\n\
      \n\
    }\n\
    \n\
    async all(req,res,next){\n\
    }\n\
    \n\
}";
    var filepath = "./Controllers/"+strUp+"Controller.js";
    
    fs.writeFile(filepath, con, (err) => {
        if (err) throw err;
        console.log(colors.green("controlador creado."));
    }); 
  }

  function createSocketController(name){
    checkDirectorySync("./Controllers/socket");
    var strUp = capitalizeFirstLetter(name);
    var cont = "module.exports = class "+strUp+"Controller{\n\
      \n\
      constructor(socket){\n\
        this.socket = socket\n\
        this.socket.on('disconnect',this.disconnect.bind(this));\n\
        this.socket.on('disconnecting',this.disconnecting.bind(this))\n\
        this.socket.on('error',this.error.bind(this));\n\
      }\n\
      \n\
      async disconnect(reason){\n\
        \n\
      }\n\
      \n\
      async disconnecting(reason){\n\
        \n\
      }\n\
      async error(error){\n\
        \n\
      }\n\
      \n\
      \n\
  }"
  var filepath = "./Controllers/socket/"+strUp+"Controller.js";
  fs.writeFile(filepath, cont, (err) => {
    if (err) throw err;
    console.log(colors.green("controlador creado."));
  }); 
}

function createMiddleware(){
  console.log("Esta funcion esta en desarrollo!");
}

function createSocketMiddleware(name){
  var strUp = capitalizeFirstLetter(name);
  var cont = "var secert = process.env.JWT_SECRET;\n\
  module.exports = (socket,next) =>{\n\
      next();\n\
  }"
  var filepath = "./Middlewares/sockets/"+strUp+"Middleware.js";
  fs.writeFile(filepath, cont, (err) => {
    if (err) throw err;
    console.log(colors.green("middleware creado."));
  });

}

function createModel(name,collection){
  var strUp = capitalizeFirstLetter(name);
  var dependencies = "var connection = require('icomm-mongo').connection;\nvar mongoose = require('icomm-mongo').mongoose;\nvar Schema = mongoose.Schema, ObjectId = Schema.ObjectId;\n\n";
  var content = "var "+strUp+"  = new Schema({\n    nombres: { type : String, default:''}\n});\n\n";
  var exportm = "module.exports = {"+strUp+":connection.model('"+collection+"',"+strUp+", '"+collection+"')}";
  var fileContent = dependencies+content+exportm;
  var filepath = "./Models/Mongo/"+strUp+"Model"+".js";
  
  fs.writeFile(filepath, fileContent, (err) => {
      if (err) throw err;
      console.log(colors.green("modelo creado!"));
    }); 
}
  function createMySqlModel(name,table){
    var strUp = capitalizeFirstLetter(name);
    var cont = "var Model = require('mysql-ic-models');\n\
    \n\
module.exports = class "+strUp+"Model extends Model{\n\
    static get table(){\n\
        return '"+table+"'\n\
    }\n\
    static get primaryKey(){\n\
        return 'id'\n\
    }\n\
    \n\
    constructor(props){\n\
        super(props,'"+table+"','id');\n\
    }\n\
}"
  var filepath = "./Models/Mysql/"+strUp+"Model"+".js";
    fs.writeFile(filepath, cont, (err) => {
      if (err) throw err;
      console.log(colors.green("modelo creado!"));
    }); 
  }

  function createRouting(name){
    
  }

  function createProject(name){
    var main = name;
    var dirs = ["config","Controllers","Models","router","Middlewares","sockets","node_modules"];
    var files = [".gitignore"];

    var filescont = [];

    fs.mkdirSync(main, []);

    fs.writeFile(main+"/server.js","var app = require('ic-server')\napp.runServer();\n//Descomentar para iniciar el servicio de sockets\n//app.runSocketServer();", (err) => {
      if (err) throw err;
    }); 
    fs.writeFile(main+"/.gitignore","node_modules/\n.env", (err) => {
      if (err) throw err;
    }); 
    //Generar directorios
    dirs.forEach(dir => {
      fs.mkdirSync(main+"/"+dir, []);
    });
    fs.copyFileSync(__dirname+'/package.json', main+'/package.json');
    fs.copyFileSync(__dirname+'/.env', main+'/.env');
    fs.copyFileSync(__dirname+'/files/server-sock.js', main+'/sockets/server.js');
    fs.copyFileSync(__dirname+'/files/app.js', main+'/config/app.js');
    fs.copyFileSync(__dirname+'/files/routes.js', main+'/router/routes.js');
    fs.copySync(__dirname+'/files/node_modules', main+'/node_modules');
    fs.copySync(__dirname+'/files/sockets', main+'/Middlewares/sockets');
    console.log(colors.green("Proyecto creado con exito!!!"));
    console.log(colors.green("Project created succesfuly !!!"));
    console.log(colors.yellow(" ******************************************************"));
    console.log(colors.yellow(" ****** Run npm install to install dependencies *******"));
    console.log(colors.yellow(" ******************************************************"));
  }

 module.exports = {
   controller:createController,
   controllerSocket:createSocketController,
   middlewareSocket:createSocketMiddleware,
   middleware:createMiddleware,
   model:createModel,
   modelMysql:createMySqlModel,
   project:createProject
 }