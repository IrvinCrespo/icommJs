var jwt = require('jsonwebtoken');
var secert = process.env.JWT_SECRET;
module.exports = (socket,next) =>{
    var token = socket.handshake.query.token;
    if(token){
        try {
            var decoded = jwt.verify(token, secert);
            next();
          } catch(err) {
            return next(new Error("unauthorized"));
          }
    }else{
        console.log("Error");
        return next(new Error("Missing token!"));
    }
    
}

