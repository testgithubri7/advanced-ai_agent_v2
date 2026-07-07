function buildPrompt({

    userMessage,

    retrievedContext,

    memory = "",

    toolResults = ""

}) {

    return `

You are an AI assistant.

Answer ONLY using the retrieved context.

If the answer is not present, say you don't know.

================================

USER QUESTION

${userMessage}

================================

MEMORY

${memory}

================================

RETRIEVED CONTEXT

${retrievedContext}

================================

TOOL RESULTS

${toolResults}

================================

ANSWER

`;

}

module.exports = buildPrompt;