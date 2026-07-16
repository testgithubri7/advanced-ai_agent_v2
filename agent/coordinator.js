const planningPhase =
    require("./planningPhase");

const executionPhase =
    require("./executionPhase");

const answerPhase =
    require("./answerPhase");

const reflectionPhase =
    require("./reflectionPhase");

async function coordinator(state) {

    const MAX_ITERATIONS = 3;

    console.log(
        "\n=================================="
    );

    console.log(
        "STARTING AGENT WORKFLOW"
    );

    console.log(
        "==================================\n"
    );

    // ==========================
    // Planning
    // ==========================

    await planningPhase(
        state
    );

    // ==========================
    // Execution
    // ==========================

    await executionPhase(

        state,

        MAX_ITERATIONS

    );

    // ==========================
    // Final Answer
    // ==========================

    await answerPhase(
        state
    );

    // ==========================
    // Reflection
    // ==========================

    await reflectionPhase(

        state,

        MAX_ITERATIONS

    );

    return state;

}

module.exports =
    coordinator;