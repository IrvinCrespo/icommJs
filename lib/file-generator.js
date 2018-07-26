var fs = require('file-system');

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
    var con = "var mongoose = require('icomm_mongo').mongoose;\n\
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
        sampleFile.mv('/path/on/to/uploadfiles/filename.jpg', function(err) {\n\
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
        console.log("controlador creado.");
    }); 
  }
  function createModel(name,collection){
    var strUp = capitalizeFirstLetter(name);
    var dependencies = "var connection = require('icomm_mongo').connection;\nvar mongoose = require('icomm_mongo').mongoose;\nvar Schema = mongoose.Schema, ObjectId = Schema.ObjectId;\n\n";
    var content = "var "+strUp+"  = new Schema({\n    nombres: { type : String, default:''}\n});\n\n";
    var exportm = "module.exports = {"+strUp+":connection.model('"+collection+"',"+strUp+", '"+collection+"')}";
    var fileContent = dependencies+content+exportm;
    var filepath = "./Models/"+strUp+"Model"+".js";
    
    fs.writeFile(filepath, fileContent, (err) => {
        if (err) throw err;
        console.log("modelo creado.");
    }); 
  }

  function createRouting(name){
    
  }

  function createProject(name){
    var main = name;
    var dirs = ["config","Controllers","Models","router","middlewares","sockets","node_modules"];
    var files = [".gitignore"];

    var filescont = [];

    fs.mkdirSync(main, []);

    fs.writeFile(main+"/server.js","var app = require('./config/app');\napp.runServer();\n'//Descomentar para iniciar el servicio de sockets\n//app.runSocketServer();'", (err) => {
      if (err) throw err;
    }); 
    fs.writeFile(main+"/.gitignore","node_modules/", (err) => {
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
    console.log("Proyectoooo!!!");
  }

 module.exports = {
   controller:createController,
   model:createModel,
   project:createProject
 }