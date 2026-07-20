const executionEngine =
    require("./executionEngine");

const observe =
    require("./observer");

const {
    addScratchpadEntry
} = require("./scratchpad");

async function executionPhase(
    state,
    MAX_ITERATIONS
) {

    while (

        !state.done &&

        state.iteration < MAX_ITERATIONS

    ) {

        state.iteration++;

        console.log(
            `\n========== ITERATION ${state.iteration} ==========\n`
        );

        // ==========================
        // Execute Plan
        // ==========================

        const newResults =
            await executionEngine(

                state.plan,

                state.userMessage

            );

        console.log(
            "\n===== EXECUTION RESULTS ====="
        );

        console.log(newResults);

        state.toolResults.push(
            ...newResults
        );

        console.log(
            "\n===== STATE TOOL RESULTS ====="
        );

        console.log(
            state.toolResults
        );


    // ==========================================
// Add execution results to Scratchpad
// ==========================================

for (const result of newResults) {

    addScratchpadEntry(

        state,

        "tool",

        result.task,

        result.result

    );

}

        // ==========================
        // Retrieved Context
        // ==========================

        const documentResults =
            state.toolResults.filter(

                tool =>
                    tool.tool ===
                    "documentSearch"

            );

        state.retrievedContext =
            documentResults

                .map(
                    tool => tool.result
                )

                .join("\n\n");

        console.log(
            "\n===== RETRIEVED CONTEXT ====="
        );

        console.log(
            state.retrievedContext
        );

        // ==========================
        // Observe
        // ==========================

        state.observation =
            await observe(state);

        console.log(
            "\n===== OBSERVER ====="
        );

        console.log(
            state.observation
        );

        // ==========================
        // Enough Information?
        // ==========================

        if (state.observation.done) {

            state.done = true;

            break;

        }

        console.log(
            "Observer requested another iteration..."
        );

        console.log(
            "\n===== REPLANNING ====="
        );

        state.userMessage =
            state.observation.nextQuery;

        state.plan =
            await require("./planner")(state);

        state.goal =
            state.plan.goal;

        console.log(
            "\n===== UPDATED PLAN ====="
        );

        console.log(
            state.plan
        );

    }

    return state;

}

module.exports =
    executionPhase;