const agentRouter =
    require("../agents/agentRouter");

const multiAgentPlanner =
    require("./multiAgentPlanner");

const agentScheduler =
    require("./agentScheduler");

const observe =
    require("./observer");

const reflectionPhase =
    require("./reflectionPhase");

const persistencePhase =
    require("./persistencePhase");


async function multiAgentCoordinator(state) {

    const MAX_CYCLES = 3;

    while (

        !state.done &&

        state.cycle < MAX_CYCLES

    ) {

        state.cycle++;

        console.log(
            `\n========== AGENT CYCLE ${state.cycle} ==========\n`
        );

        // ==========================================
        // Multi-Agent Planning
        // ==========================================

        if (!state.multiAgentPlan) {

            await multiAgentPlanner(state);

            console.log(
                "\n===== MULTI AGENT PLAN ====="
            );

            console.log(
                state.multiAgentPlan
            );

        }


        // ==========================================
        // Agent Routing
        // ==========================================

        if (!state.agentPlan) {

            await agentRouter(state);

            console.log(
                "\n===== AGENT PLAN ====="
            );

            console.log(
                state.agentPlan
            );

        }


        // ==========================================
        // Execute Agents
        // ==========================================

        await agentScheduler(state);


        // ==========================================
        // Observer
        // Check if enough information exists
        // ==========================================

        state.observation =
            await observe(state);

        console.log(
            "\n===== OBSERVATION ====="
        );

        console.log(
            state.observation
        );


        // ==========================================
        // Need More Information?
        // ==========================================

        if (!state.observation.done) {

            console.log(
                "\nObserver requested another planning cycle..."
            );

            state.userMessage =
                state.observation.nextQuery;

            // Clear previous plans

            state.multiAgentPlan = null;

            state.agentPlan = null;

            // Clear execution metadata only

            state.agentResults = [];

            continue;

        }


        // ==========================================
        // Reflection
        // Information is enough, now evaluate quality
        // ==========================================

        await reflectionPhase(

            state,

            MAX_CYCLES

        );

        console.log(
            "\n===== REFLECTION ====="
        );

        console.log(
            state.reflection
        );


        // ==========================================
        // Reflection requested improvement
        // ==========================================

        if (

            state.reflection &&

            state.reflection.needReplan

        ) {

            console.log(
                "\nReflection requested another reasoning cycle..."
            );

            state.multiAgentPlan = null;

            state.agentPlan = null;

            continue;

        }


        // ==========================================
        // Finished Successfully
        // ==========================================

        console.log(
            "\nWorkflow completed successfully."
        );

        state.done = true;

    }


    // ==========================================
    // Persistence
    // ==========================================

    await persistencePhase(state);

    return state;

}

module.exports =
    multiAgentCoordinator;