const mongoose = require("mongoose");

console.log("Loading Conversation Model...");

const conversationSchema = new mongoose.Schema({
    userId: String,

    messages: [
        {
            role: String,
            content: String
        }
    ]
});

module.exports = mongoose.model(
    "Conversation",
    conversationSchema
);