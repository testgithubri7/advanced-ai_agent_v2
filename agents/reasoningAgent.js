const { GoogleGenAI } =
    require("@google/genai");


const ai =
    new GoogleGenAI({

        apiKey:
            process.env.GEMINI_API_KEY

    });



async function reasoningAgent(state, task) {


    console.log(
        "\n===== REASONING AGENT ====="
    );


    const prompt = `

You are a reasoning specialist agent.

Your responsibility is to analyze information
provided by the Research Agent.

You DO NOT retrieve information.

You DO NOT answer the user directly.

You only analyze the evidence.

==================================

RESEARCH INFORMATION

${JSON.stringify(
    state.researchResult,
    null,
    2
)}

==================================

Perform reasoning.

Identify:

- important facts
- comparisons
- relationships
- conclusions

Return only JSON.

Schema:

{
    "analysis":"string"
}

`;


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



    state.workspace.reasoning = {

    task: task.task,

    analysis: result,

    completed: true,

    timestamp: Date.now()

};


    console.log(
        "\n===== REASONING RESULT ====="
    );


    console.log(
        state.workspace.reasoning
    );


    return state;

}


module.exports =
    reasoningAgent;