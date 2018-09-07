var routes = require("ic-server").Router


/**
 * you can create simple routes with express router like this 
 * 
 * puedes crear rutas simples con el router de express como esta
 * 
 * routes.get("/holo",(req,res)=>{
 *	 res.status(200).send("hello mdf")
 * })
 * 
 * if you have a controller class, you can do this
 * 
 * si tienes una clase controlador, puedes hacer lo siguiente
 * 
 * var ExampleController = new (require('../path/to/controller'))
 * routes.get('/example',ExampleController.myfunction)
 * 
 * or you can group routes in a same prefix
 * 
 * o puedes agrupar rutas para un mismo prefijo
 * 
 * routes.group("/api/v1",(router)=>{
 * 		router.post('/example',ExampleController.myfunction)
 * 		//all routes here will look like this example -> localhost:7000/api/v1/example 
 * })
 * 
 */
