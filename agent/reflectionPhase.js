const reflector =
    require("./reflector");

async function reflectionPhase(
    state,
    MAX_ITERATIONS
) {

    const reflection =
        await reflector(

            state.originalUserMessage,

            state.finalAnswer,

            JSON.stringify(
                state.toolResults,
                null,
                2
            )

        );

    console.log(
        "\n===== REFLECTION RESULT ====="
    );

    console.log(
        reflection
    );

    // Save reflection into state
    state.reflection =
        reflection;

    if (

        reflection.needReplan &&

        state.iteration < MAX_ITERATIONS

    ) {

        console.log(
            "\nReflection requested replanning..."
        );

        state.done = false;

        state.userMessage =
            reflection.nextAction;

    }

    return state;

}

module.exports =
    reflectionPhase;