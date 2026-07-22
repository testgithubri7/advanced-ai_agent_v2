const executionEngine =
    require("./executionEngine");

const executionScheduler =
    require("./executionScheduler");

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

        // ==========================================
        // Build Execution Rounds
        // ==========================================

        const rounds =
            executionScheduler(
                state.plan.steps
            );

        console.log(
            "\n===== EXECUTION ROUNDS ====="
        );

        console.log(rounds);

        // ==========================================
        // Execute Each Round
        // ==========================================

        for (const round of rounds) {

            console.log(
                "\n===== EXECUTING ROUND ====="
            );

            console.log(round);

            const roundResults =
                await executionEngine(

                    round,

                    state.toolResults

                );

            console.log(
                "\n===== ROUND RESULTS ====="
            );

            console.log(
                roundResults
            );

            // ==========================
            // Store Results
            // ==========================

            state.toolResults.push(
                ...roundResults
            );

            // ==========================
            // Scratchpad
            // ==========================

            for (const result of roundResults) {

                addScratchpadEntry(

                    state,

                    "tool",

                    result.task,

                    result.result

                );

            }

        }

        console.log(
            "\n===== STATE TOOL RESULTS ====="
        );

        console.log(
            state.toolResults
        );

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