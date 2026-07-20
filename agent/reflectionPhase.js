const reflector =
    require("./reflector");

const { addScratchpadEntry } =
    require("./scratchpad");

const buildScratchpadSummary =
    require("./scratchpadSummary");

async function reflectionPhase(state) {

    console.log(
        "\n===== REFLECTION PHASE =====\n"
    );

    const reflection =
        await reflector(

            state.originalUserMessage,

            state.finalAnswer,

            buildScratchpadSummary(state)

        );

    console.log(
        "\n===== REFLECTION RESULT ====="
    );

    console.dir(
        reflection,
        { depth: null }
    );

    // ==========================
    // Save Reflection
    // ==========================

    state.reflection = reflection;

    state.reflectionGuidance =
        reflection.nextAction || "";

    // ==========================
    // Save into Scratchpad
    // ==========================

    addScratchpadEntry(

        state,

        "reflection",

        "Answer Evaluation",

        reflection

    );

    console.log(
        "\n===== SCRATCHPAD AFTER REFLECTION ====="
    );

    console.dir(
        state.scratchpad,
        { depth: null }
    );

    return state;

}

module.exports = reflectionPhase;