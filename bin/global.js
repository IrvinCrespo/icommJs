#!/usr/bin/env node

var myLibrary = require('../lib/index.js');
var fg = require('../lib/file-generator.js');


var args = process.argv.splice(process.execArgv.length + 2);
//Primer argumanto puede ser make
var arg1 = args[0];
var arg2 = args[1];
var arg3 = args[2];
var arg4M = args[3];

/**
 * icomm g controller <nombre_del_controller>
 * icomm g model <nombre_del_modelo> <nombre_colleccion_en_mongo>
 * icomm g project <nombre_proyecto>
 */
myLibrary.say('Argumentos: '+arg1);
if(arg1 == "g"){
    switch(arg2){
        case "controller":
            fg.controller(arg3);
            break;
        case "model":
            if(arg3)
                if(arg4M) fg.model(arg3,arg4M);
                else myLibrary.say('se debe especificar la coleccion en la base de datos de mongo');
            else myLibrary.say('se debe especificar el nombre del modelo.');
            break;
        case "project":
            if(arg3) fg.project(arg3);
            else myLibrary.say('se debe especificar el nombre del proyecto.');
            break;
    }
}
//myLibrary.say('Que onda perro');

