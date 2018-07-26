function init(io){
    //Se registran los escuchadores
    io.on('connection',function(socket){
        
        socket.on("new-message",function(){});

    });
}

module.exports = {
    config:init
}

