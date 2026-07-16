const ai =
    require("../config/gemini");

const buildPrompt =
    require("./promptBuilder");

async function answerPhase(state) {

    // STEP 3 - Build Final Prompt
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
                    state.toolResults,
                    null,
                    2
                )

        });

    console.log(
        "\n========== FINAL PROMPT ==========\n"
    );

    console.log(prompt);

    console.log(
        "\n=============================\n"
    );

    // STEP 4 - Generate Final Answer LLM Response
    const response =
        await ai.models.generateContent({

            model:
                "gemini-2.5-flash",

            contents:
                prompt

        });

    state.finalAnswer =
        response.text;

    return state;

}

module.exports =
    answerPhase;