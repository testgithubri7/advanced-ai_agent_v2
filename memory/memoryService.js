const Conversation =
    require("../models/Conversation");

async function retrieveMemory(userId) {

    const conversation =
        await Conversation.findOne({

            userId

        });

    if (!conversation) {

        return "";

    }

    return conversation.messages

        .map(message =>

            `${message.role}: ${message.content}`

        )

        .join("\n");

}

module.exports =
    retrieveMemory;