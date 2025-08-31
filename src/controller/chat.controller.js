const chatModel = require('../models/chat.model');

async function createChat(req, res) {
    const {title} = req.body;
    const user = req.user; 

    const chat = await chatModel.create({
        user: user._id,
        chatId: 
        title
    });

    res.status(201).json({message: "Chat created successfully", chat})

}

module.exports = {createChat};
