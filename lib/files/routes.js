var router;
var approuter = null;

function config(app,express){
	router = express.Router();
	approuter = app;
	listen();
}



function listen(){
	
	router.get('/',function(req,res,next){
		
	});


	router.post('/',function(req,res,next){
		
	});

	
	router.delete('/',function(req,res,next){
		
	});

	
	router.put('/',function(req, res, next){
		
	});

	approuter.use('/api/v2',router);
}

module.exports = {
	config:config
}