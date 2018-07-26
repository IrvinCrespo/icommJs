#!/usr/bin/env node

var myLibrary = require('../lib/index.js');
var fg = require('../lib/file-generator.js');


var args = process.argv.splice(process.execArgv.length + 2);
//Primer argumanto puede ser make
var arg1 = args[0]; //g
var arg2 = args[1]; // controller, model, project
var arg3 = args[2]; // <nombre>
var arg4M = args[3]; //<nombre_colleccion si es un modelo>, o puede ser --socket

/**
 * icomm g controller <nombre_del_controller> --socket <--opcional
 * icomm g model <nombre_del_modelo> <nombre_colleccion_en_mongo>
 * icomm g project <nombre_proyecto>
 */

if(arg1 == "g"){
    switch(arg2){
        case "controller":
            if (arg3)
                if(arg4M && arg4M == "--socket") fg.controllerSocket(arg3)
                else fg.controller(arg3);
            else myLibrary.say('se debe especificar un nombre para el controllador');
            break;
        case "middleware":
            if (arg3)
                if(arg4M && arg4M == "--socket") fg.middlewareSocket(arg3)
                else fg.middleware(arg3)
            else myLibrary.say('se debe especificar un nombre para el middleware');
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
}else if(arg1 == "h"){
    myLibrary.say('     Opciones: ');
    myLibrary.say('     g controller <nombre_del_controller> --socket <--opcional\n');
    myLibrary.say('     g model <nombre_del_modelo> <nombre_colleccion_en_mongo>\n');
    myLibrary.say('     g project <nombre_proyecto>\n\n');
}
//myLibrary.say('Que onda perro');

