const { GoogleGenAI } =
    require("@google/genai");


const promptBuilder =
    require("../prompts/multiAgentPlannerPrompt");


const ai =
    new GoogleGenAI({

        apiKey:
        process.env.GEMINI_API_KEY

    });



async function multiAgentPlanner(state){


    console.log(
        "\n===== MULTI AGENT PLANNER ====="
    );


    const prompt =
        promptBuilder(state);



    const response =
        await ai.models.generateContent({

            model:
            "gemini-2.5-flash",

            contents:
            prompt

        });



    let text =
        response.text
        .trim();



    text =
    text
    .replace(/```json/g,"")
    .replace(/```/g,"")
    .trim();



    const plan =
        JSON.parse(text);



    state.multiAgentPlan =
        plan;


    console.log(
        state.multiAgentPlan
    );


    return state;

}


module.exports =
    multiAgentPlanner;