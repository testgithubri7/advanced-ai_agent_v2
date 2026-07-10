const ai =
    require("../config/gemini");

const plannerPrompt =
    require("../prompts/plannerPrompt");

async function planner(state) {

    const prompt =
        plannerPrompt(state);

    const response =
        await ai.models.generateContent({

            model:
                "gemini-2.5-flash",

            contents:
                prompt

        });

    const cleaned =
        response.text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

    console.log("\n===== PLANNER RESPONSE =====\n");

    console.log(cleaned);

    return JSON.parse(cleaned);

}

module.exports =
    planner;