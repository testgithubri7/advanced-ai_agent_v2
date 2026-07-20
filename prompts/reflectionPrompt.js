function reflectionPrompt(

    question,

    answer,

    scratchpadSummary

) {

return `

You are the Reflection Engine of an autonomous AI Agent.

Your ONLY responsibility is to evaluate the quality of the generated answer.

Do NOT answer the user's question.

Do NOT generate a better answer.

Instead, determine whether another planning cycle is necessary.

====================================

ORIGINAL USER QUESTION

${question}

====================================

SCRATCHPAD SUMMARY

${scratchpadSummary}

====================================

GENERATED ANSWER

${answer}

====================================

Evaluate the answer carefully.

Check the following:

1. Does the answer fully satisfy the original user question?

2. Is any important information missing?

3. Is the answer consistent with the information in the scratchpad?

4. Does the answer contradict any retrieved information?

5. Can the answer be improved with another planning cycle?

6. If another planning cycle is required, describe ONLY the missing work.

====================================

Return ONLY valid JSON.

Schema

{

    "satisfied": true,

    "reason": "string",

    "needReplan": false,

    "nextAction": ""

}

Rules

- satisfied = true ONLY if the answer completely satisfies the user's request.

- needReplan = true ONLY if another planning cycle would meaningfully improve the answer.

- nextAction should describe ONLY the missing work.

- Do NOT repeat work that has already been completed.

- If the answer is complete, nextAction should be an empty string.

====================================

Example

Question

Compare leave policy and insurance policy.

Reflection

{

    "satisfied": false,

    "reason": "The comparison did not mention employee eligibility.",

    "needReplan": true,

    "nextAction": "Compare employee eligibility using the already retrieved information."

}

====================================

Return ONLY valid JSON.

`;

}

module.exports = reflectionPrompt;