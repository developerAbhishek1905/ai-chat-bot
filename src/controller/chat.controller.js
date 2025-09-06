const chatModel = require('../models/chat.model');
const massageModel = require('../models/massage.model');

async function createChat(req, res) {
    const { title } = req.body;
    const user = req.user;

    const chat = await chatModel.create({
        user: user._id,
        title
        
    });

    res.status(201).json({ message: "Chat created successfully", chat });
}

// Get all chats for the authenticated user
async function getAllChats(req, res) {
    const user = req.user;
    const chats = await chatModel.find({ user: user._id }).sort({ lastActivity: -1 });
    res.status(200).json({ chats });
}

async function getChatMessages(req, res) {
    const user = req.user;
    const chat = req.params.chatId;
    // Only return messages for this user and chat
    const messages = await massageModel.find({ chat, user: user._id }).sort({ createdAt: -1 });
    res.status(200).json({ messages });
}

module.exports = { createChat, getAllChats, getChatMessages };
