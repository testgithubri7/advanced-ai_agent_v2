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

`
================================

TASK

${result.task}


TOOL USED

${result.tool}


RESULT

${result.result}

================================
`

        )

        .join("\n\n");



    const prompt = `


You are the reasoning engine of an autonomous AI Agent.


You are executing the FINAL analysis step of a larger plan.


Your responsibility is to analyze information collected by previous tools and generate a useful response.


================================

CURRENT TASK


${step.task}


================================

INSTRUCTION


${step.query}


================================

AVAILABLE INFORMATION FROM TOOLS


${context}


================================


ANALYSIS RULES


If this is a stock market analysis:


Analyze using:


1. Current Price

Explain:

- Current price
- Daily movement


2. Historical Performance

Analyze:

- Recent price movement
- Growth or decline
- Major corrections
- Support/resistance observations


3. Technical Indicators

Analyze:

- Trend
- Moving averages
- Returns
- Volatility


4. News Sentiment

Analyze:

- Positive factors
- Negative factors
- Market sentiment


5. Final Summary


Provide:


- Current situation

- Bullish factors

- Bearish factors

- Risks

- Overall outlook


Important:

- Do NOT guarantee profit.
- Do NOT give direct financial advice.
- Explain uncertainty.
- Mention that investment decisions depend on user's goals and risk tolerance.


================================


Return a structured analysis.


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