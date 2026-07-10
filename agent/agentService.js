const createState =
    require("./state");

const planner =
    require("./planner");

const executionEngine =
    require("./executionEngine");

const observe =
    require("./observer");

const buildPrompt =
    require("./promptBuilder");

const { GoogleGenAI } =
    require("@google/genai");

const ai =
    new GoogleGenAI({

        apiKey:
            process.env.GEMINI_API_KEY

    });

async function chat(userMessage) {

    // STEP 1 - Create Agent State
    const state =
        createState(userMessage);

    // STEP 2 - Planner
   state.plan =
    await planner(state);

    state.goal =
        state.plan.goal;

    const MAX_ITERATIONS = 3;

    while (

        !state.done &&

        state.iteration < MAX_ITERATIONS

    ) {

        state.iteration++;

        console.log(
            `\n========== ITERATION ${state.iteration} ==========\n`
        );

        // =====================================
        // Execute Tools
        // =====================================
        
        //step 3(execution)
        const newResults =
            await executionEngine(

                state.plan,

                state.userMessage

            );

        console.log(
            "\n===== EXECUTION RESULTS ====="
        );

        console.log(
            newResults
        );

        // Keep previous results also
        state.toolResults.push(
            ...newResults
        );

        console.log(
            "\n===== STATE TOOL RESULTS ====="
        );

        console.log(
            state.toolResults
        );

        // =====================================
        // Extract Retrieved Context
        // =====================================

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

        // =====================================
        // Observe
        // =====================================

        //step 4 (observe)
        state.observation =
            await observe(state);

        console.log(
            "\n===== OBSERVER ====="
        );

        console.log(
            state.observation
        );

        // =====================================
        // Stop if enough information
        // =====================================
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

// Update the query
state.userMessage =
    state.observation.nextQuery;

// Ask the planner to make a NEW plan
state.plan =
    await planner(
        state
    );

state.goal =
    state.plan.goal;

console.log(
    state.plan
);

console.log(
    "\n===== UPDATED NEW PLAN ====="
);

console.log(state.plan);

console.log(
    "\n===== NEXT QUERY ====="
);

console.log(state.userMessage);

    }

    // =====================================
    // Build Final Prompt
    // =====================================
    //step 5:prompt building
    const prompt =
        buildPrompt({

            userMessage:
                state.userMessage,

            retrievedContext:
                state.retrievedContext,

            memory:
                state.memory,

            toolResults:
                JSON.stringify(
                    state.toolResults
                )

        });

    console.log(
        "\n========== FINAL PROMPT ==========\n"
    );

    console.log(
        prompt
    );

    console.log(
        "\n=============================\n"
    );

    // =====================================
    // Final LLM Call
    // =====================================

    //step 6: final answer generation
    const response =
        await ai.models.generateContent({

            model:
                "gemini-2.5-flash",

            contents:
                prompt

        });

    state.finalAnswer =
        response.text;

    return state.finalAnswer;

}

module.exports = {

    chat

};