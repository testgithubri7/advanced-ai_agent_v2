const { GoogleGenAI } =
    require("@google/genai");


const agentRouterPrompt =
    require("../prompts/agentRouterPrompt");


const ai =
    new GoogleGenAI({

        apiKey:
            process.env.GEMINI_API_KEY

    });



async function agentRouter(state) {


    console.log(
        "\n===== AGENT ROUTER ====="
    );


    const prompt =
        agentRouterPrompt(state);



    const response =
        await ai.models.generateContent({

            model:
                "gemini-2.5-flash",

            contents:
                prompt

        });



    let text =
        response.text.trim();


    text =
        text
        .replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();



    const result =
        JSON.parse(text);



    state.agentPlan =
        result;



    console.log(
        state.agentPlan
    );


    return state;

}


module.exports =
    agentRouter;