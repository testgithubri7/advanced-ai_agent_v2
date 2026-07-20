const saveConversation =
    require("../memory/conversationService");

const addMemory =
    require("../memory/addMemory");



async function persistencePhase(state) {

    console.log(
        "\n===== PERSISTENCE PHASE ====="
    );

    console.log(
        "Saving Conversation..."
    );

    await saveConversation(

        "default-user",

        state.originalUserMessage,

        state.finalAnswer

    );

    console.log(
        "Conversation Saved."
    );

    console.log(
        "Adding Semantic Memory..."
    );

    await addMemory(

        "default-user",

        state.originalUserMessage,

        state.finalAnswer

    );

    console.log(
        "Semantic Memory Added."
    );

    return state;

}

module.exports =
    persistencePhase;