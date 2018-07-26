function init(io){
    
    var main = io.of('/');
    
    //Se registran los escuchadores
    main.on('connection',function(socket){
        socket.on("new-message",function(){});
    });
}

module.exports = {
    config:init
}
