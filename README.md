# icommJs english
<code>
  npm install -g icomm-cli
</code>

Icomm is a JS framework for node js, it is a project that takes the best npm libraries and libraries to do the job of creating an API
rest faster and easier.
This project is a client to generate projects in Icomm, as well as the different components that are used in the project,
like the controllers, models.

The models in IcommJS are by default based on MongoDB, with the help of mongoose, a library for the management of documents of
MongoDB in nodeJs.


Now in the new version, you can create models for mysql.
Icomm continues in development, at the moment it has basic commands such as:

#Create project

<code>icomm g project (project name)</code>
generates a new project with the name specified in the folder located

#Create model

<code>icomm g model (model name) (collection o table) --mysql or --mongo</code>
Create a new model, you must specify what kind of model is going to be used by pointing to the database
available for now in icomm.

#Create controllers

<code>icomm g controller (controller name) --api or --socket</code>
create a controller, specifying the type of this by means of the options --api or --socket


--api creates a controller for webservice requests

--socket generates a controller for socket.io namespaces, with this
you can create and implement the drivers that are necessary, depending on the type of
information that must be issued and separate the logic of each module.

# icommJs español

node js framework 
Icomm es un framework de JS para node js, es un proyecto que toma los mejores modulos y librerias de npm para hacer el trabajo de crear un API
rest mas rapido y facil. 
Este proyecto es un cliente para generar proyectos en Icomm, asi como los diferentes componentes que se utilizan en el proyecto,
como los controladores, modelos.

Los modelos en IcommJS estan por defecto basados en MongoDB, con la ayuda de mongoose, una libreria para el manejo de documentos de 
MongoDB en nodeJs.

Ahora en la nueva version, puedes crear modelos para mysql.
Icomm continua en desarrollo, por el momento cuenta con comandos basicos como:

#Crear un proyecto

<code>icomm g project (nombre del proyecto)</code>
genera un nuevo proyecto con el nombre especificado en la carpeta situada

#Crear un modelo

<code>icomm g model (nombre del modelo) (coleccion o tabla) --mysql o --mongo</code>
Crea un nuevo modelo, se debe especificar que tipo de modelo se va a usar señalando la base de datos
disponibles por ahora en icomm.

#Crear un controlador

<code>icomm g controller nombre_controlador --api o --socket</code>
crea un controlador, especificando el tipo de este por medio de las opciones --api o --socket

--api crea un controlador para peticiones tipo webservice

--socket genera un controlador para los namespaces de socket io, con este
se puede crear e implementar los controladores que sean necesarios, dependiendo el tipo de 
informacion que deba ser emitida y separar la logica de cada modulo.


