const ai =
    require("../config/gemini");

const plannerPrompt =
    require("../prompts/plannerPrompt");

async function planner(message) {

    const prompt =
        plannerPrompt(message);

    const response =
        await ai.models.generateContent({

            model:
                "gemini-2.5-flash",

            contents:
                prompt

        });

    const text =
        response.text.trim();

    const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
    console.log("\nPlanner Raw Response:");

    console.log(cleaned);

    return JSON.parse(cleaned);

}

module.exports =
    planner;