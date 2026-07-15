const ai =
    require("../config/gemini");

async function llmExecutor(
    step,
    previousResults
) {

    console.log(
        "\n===== LLM EXECUTOR =====\n"
    );

    const context =
        previousResults

            .map(result =>

`Task:
${result.task}

Result:
${result.result}`

            )

            .join("\n\n");

    const prompt = `

You are executing ONE step of a larger AI plan.

Complete ONLY the current step.

===============================

CURRENT TASK

${step.task}

===============================

INSTRUCTION

${step.query}

===============================

PREVIOUS STEP RESULTS

${context}

===============================

Return ONLY the result of this step.

`;

    console.log(prompt);

    const response =
        await ai.models.generateContent({

            model:
                "gemini-2.5-flash",

            contents:
                prompt

        });

    return response.text;

}

module.exports =
    llmExecutor;