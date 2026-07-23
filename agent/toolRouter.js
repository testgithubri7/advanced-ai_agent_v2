const { GoogleGenAI } =
    require("@google/genai");

const toolRouterPrompt =
    require("../prompts/toolRouterPrompt");

const ai =
    new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

async function toolRouter(state) {

    const prompt =
        toolRouterPrompt(state);

    const response =
        await ai.models.generateContent({

            model:
                "gemini-2.5-flash",

            contents:
                prompt

        });

    let text =
        response.text.trim();

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const routerResult =
        JSON.parse(text);

    state.router = routerResult;

    console.log(
        "\n===== TOOL ROUTER RESULT =====\n"
    );

    console.log(
    JSON.stringify(
        state.router,
        null,
        2
    )
);

console.log("\n===============================\n");


    return routerResult;

}

module.exports =
    toolRouter;