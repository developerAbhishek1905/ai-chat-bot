const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    user:{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth',
        required: true  
    },
    title:{
        type: String,  
        required: true
    },
    lastActivity:{type: Date,
    default: Date.now
    },
    
},
{tmestamps: true}
)


const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel; 