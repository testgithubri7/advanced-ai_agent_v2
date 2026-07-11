const Conversation =
    require("../models/Conversation");

async function saveConversation(
    userId,
    userMessage,
    assistantMessage
) {

    let conversation =
        await Conversation.findOne({
            userId
        });

    if (!conversation) {

        conversation =
            new Conversation({
                userId,
                messages: []
            });

    }

    conversation.messages.push({
        role: "user",
        content: userMessage
    });

    conversation.messages.push({
        role: "assistant",
        content: assistantMessage
    });

    await conversation.save();

}

module.exports = saveConversation;