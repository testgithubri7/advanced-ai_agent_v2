const planner =
    require("./planner");

const semanticMemoryService =
    require("../memory/semanticMemoryService");

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