const planner =
    require("./planner");

const semanticMemoryService =
    require("../memory/semanticMemoryService");

const { addScratchpadEntry } = require("./scratchpad");

async function planningPhase(state) {

    console.log(
        "\n===== PLANNING PHASE =====\n"
    );

    // ===========================
    // Planner
    // ===========================

    state.plan =
        await planner(state);

    state.goal =
        state.plan.goal;

    addScratchpadEntry(

    state,

    "plan",

    "Planning",

    {

        goal: state.plan.goal,

        steps: state.plan.steps

    }

);

    console.log("\n===== SCRATCHPAD AFTER PLANNING =====");

console.dir(state.scratchpad, {
    depth: null
});

    // ===========================
    // Semantic Memory
    // ===========================

    if (state.plan.needMemory) {

        console.log(
            "\n===== SEMANTIC MEMORY =====\n"
        );

        const memories =
            await semanticMemoryService(
                state.userMessage
            );

        state.memory =
            memories
                .map(memory => memory.text)
                .join("\n\n");

        console.log(state.memory);

    }

    return state;

}

module.exports =
    planningPhase;