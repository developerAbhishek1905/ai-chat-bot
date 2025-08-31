const {Server} = require('socket.io');
 function socketServer (httpServer){
    const io = new Server(httpServer,{
        cors:{
            origin:"http://localhost:3000",
            methods:["GET","POST"]
        }
    });

    io.on("connection",(socket)=>{
        console.log(`user connected ${socket.id}`);})
 }

 module.exports = socketServer;