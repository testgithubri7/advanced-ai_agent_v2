const { GoogleGenAI } =
    require("@google/genai");


const ai =
    new GoogleGenAI({

        apiKey:
            process.env.GEMINI_API_KEY

    });



async function answerAgent(state, task) {


    console.log(
        "\n===== ANSWER AGENT ====="
    );


    const prompt = `

You are the Answer Agent of an autonomous AI system.

Your responsibility is ONLY to generate the final response
for the user.

Use the research and reasoning provided.

Do not mention internal agents.

Do not mention scratchpads, tools, or workflows.

Answer clearly and naturally.

==================================

USER QUESTION

${state.originalUserMessage}

==================================

RESEARCH INFORMATION

${JSON.stringify(
    state.workspace.research,
    null,
    2
)}

==================================

REASONING RESULT

${JSON.stringify(
    state.workspace.reasoning,
    null,
    2
)}

==================================

Generate the final answer.

`;



    const response =
        await ai.models.generateContent({

            model:
                "gemini-2.5-flash",

            contents:
                prompt

        });


   state.workspace.answer = {

    task: task.task,

    response: response.text,

    completed: true,

    timestamp: Date.now()

};

state.finalAnswer = response.text;


    console.log(
        "\n===== FINAL ANSWER ====="
    );


    console.log(
        state.finalAnswer
    );


    return state;

}


module.exports =
    answerAgent;