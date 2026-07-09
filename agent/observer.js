const { GoogleGenAI } =
    require("@google/genai");

const ai =
    new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

async function observe(state) {

    const prompt = `
You are an AI planning observer.

Current Goal:
${state.goal}

User Question:
${state.userMessage}

Current Tool Results:
${JSON.stringify(state.toolResults, null, 2)}

Determine whether the agent has enough information.

Respond ONLY in JSON.

{
    "done": true,
    "reason": "...",
    "nextAction": "",
    "nextQuery": ""
}
`;

    const response =
        await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt

        });

   const cleaned = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

return JSON.parse(cleaned);
}

module.exports = observe;