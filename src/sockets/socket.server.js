const {Server} = require('socket.io');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const aiServices = require('../services/ai.service');
const massageModel = require('../models/massage.model');
const {createMomory,queryMemory} = require('../services/vector.service')

 function socketServer (httpServer){
    const io = new Server(httpServer,{
        cors:{
            origin:"http://localhost:3000",
            methods:["GET","POST"]
        }
    });

    // Middleware for socket authentication
    io.use(async(socket,next)=>{
        const cookies = cookie.parse(socket.handshake.headers?.cookie || '');
        if(!cookies.token){
            return next(new Error("Unauthorized---") );
        }

        try{
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET); 
            console.log(decoded)
            const user = await userModel.findById(decoded.userId)
            console.log(user)
            socket.user = user;
            next();
        }
        catch(err){
            return next(new Error("Unauthorized-"));
        }
    }
    )

    io.on("connection",(socket)=>{
        console.log(`user connected ${socket.id}`)
        console.log(socket.user)


//         massagePayload = {
//             { "chatId":"68b41f9874f9174b9d07ec86",
// "content":"hii"}
//         }

    
        socket.on ("ai-massage",async(payload)=>{

            
            //             console.log(typeof (payload))

            // console.log(socket.user._id)
            const massagePayload = JSON.parse(payload);
            

            const userMassage = await massageModel.create({ 
                chat :massagePayload.chatId,
                user: socket.user._id,
                content: massagePayload.content,
                role: "user"
            })
            console.log( "msaagae load", massagePayload.content)



            const vectors = await aiServices.generateEmbedings(massagePayload.content);

            const memory = await queryMemory({
                queryVector: vectors[0].values,
                limit:3,
                metadata:{}})

            // console.log("vector", typeof vectors[0])
            // console.log("vector", typeof vectors[0].values)
            await createMomory({
                vectors : vectors[0].values,
                massageId: userMassage._id,
                metadata:{
                    chatId: massagePayload.chatId,
                    user: socket.user._id,
                    text: massagePayload.content,
                }
                })
            console.log("vector", vectors);
            console.log("memory", memory);

            const chatHistory = await massageModel.find({chat: massagePayload.chatId}).sort({createdAt:-1}).limit(20);
            chatHistory.reverse();
            
            console.log("chat history", );
            
            const aiResponse = await aiServices.generateContent(chatHistory.map((item)=>{
                return{
                    role:item.role,
                    parts:[{text:item.content}]
                }
            }));




            const responseMassage = await massageModel.create({
                chat :massagePayload.chatId,
                user: socket.user._id,
                content: aiResponse,
                role: "model"
            })
            console.log(aiResponse)
                const responseVectors = await aiServices.generateEmbedings(aiResponse);
                await createMomory({
                    vectors : responseVectors[0].values,
                    massageId: responseMassage._id,
                    metadata:{
                        chatId: massagePayload.chatId,
                        user: socket.user._id,
                        text: massagePayload.content,
                    }
                    })
            socket.emit("ai-massage-response",{

                content: aiResponse,
                chatId : massagePayload.chatId
            })
        })
    
    })
 }

 module.exports = socketServer;