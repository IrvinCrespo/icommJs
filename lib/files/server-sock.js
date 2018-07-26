function init(io){
    
    var main = io.of('/');
    
    //Se registran los escuchadores
    main.on('connection',function(socket){
        socket.on("new-message",function(){});
    });
    //puedes manejar los eventos del socket instanciando un controlador
    //main.on('connection',function(socket){
    //    new MyController(socket)
    //});
}

module.exports = {
    config:init
}
