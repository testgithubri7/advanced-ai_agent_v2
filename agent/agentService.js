
const  createState  =
    require("./state");




const multiAgentCoordinator =
    require("./multiAgentCoordinator");


async function chat(userMessage) {


    // ==========================
    // Create Agent State
    // ==========================

    const state =
        createState(userMessage);



    console.log(
        "\n===== INITIAL STATE ====="
    );


    console.log(state);



    // ==========================
    // Multi Agent Workflow
    // ==========================

    await multiAgentCoordinator(
        state
    );



    console.log(
        "\n===== FINAL STATE ====="
    );


    console.log(state);



    return state.finalAnswer;

}

module.exports = {

    chat

};