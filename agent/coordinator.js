
const toolRouter = require("./toolRouter");

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

    const MAX_AGENT_CYCLES = 3;

    while (state.cycle < MAX_AGENT_CYCLES) {

        state.cycle++;

        console.log(
            `\n========== AGENT CYCLE ${state.cycle} ==========\n`
        );

        // Reset per-cycle state
        state.done = false;

        state.iteration = 0;

        state.observation = null;

        state.plan = null;

        state.goal = "";

        state.toolResults = [];

        state.retrievedContext = "";

        state.memory = "";

        // Tool Routing
        await toolRouter(state);

        // Planning
        await planningPhase(state);

        // Execution
        await executionPhase(
            state,
            MAX_ITERATIONS
        );

        // Answer
        await answerPhase(state);

        // Reflection
        await reflectionPhase(state, MAX_ITERATIONS);

        // Success
        if (state.reflection.satisfied) {

            console.log(
                "\nReflection approved the answer."
            );

            break;
        }

        console.log(
            "\nReflection requested replanning..."
        );

    }

    return state;
}

module.exports =
    coordinator;