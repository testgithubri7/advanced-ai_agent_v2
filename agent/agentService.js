const planner =
    require("./planner");

const executionEngine =
    require("./executionEngine");

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

    // STEP 1
    const plan =
        await planner(
            userMessage
        );

    // STEP 2
    const toolResults =
        await executionEngine(
            plan,
            userMessage
        );

    // STEP 3
    let retrievedContext = "";

    const documentSearch =
        toolResults.find(

            tool =>
                tool.tool ===
                "documentSearch"

        );

    if (documentSearch) {

        retrievedContext =
            documentSearch.result;

    }

    // STEP 4
    const prompt =
        buildPrompt({

            userMessage,

            retrievedContext,

            memory: "",

            toolResults:
                JSON.stringify(toolResults)

        });

    // STEP 5
    console.log("\n========== FINAL PROMPT ==========\n");

console.log(prompt);

console.log("\n=============================\n");
    const response =
        await ai.models.generateContent({

            model:
                "gemini-2.5-flash",

            contents:
                prompt

        });

    return response.text;

}

module.exports = {

    chat

};