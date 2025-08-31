require('dotenv').config()
const socketServer = require('./src/sockets/socket.server')
const connectToDB = require('./src/dataBase/db')

const app = require('./src/app')
const httpServer = require('http').createServer(app)

// Database Connection
connectToDB()
socketServer(httpServer)

httpServer.listen(3000, ()=>{
    console.log("server is running on port no. 3000")
})