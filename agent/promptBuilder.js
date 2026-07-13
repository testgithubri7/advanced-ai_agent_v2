function buildPrompt({

    userMessage,

    retrievedContext,

    memory = "",

    toolResults = ""

}) {

    return `

Answer using the available information below.

Use MEMORY when the answer depends on previous conversations.

Use RETRIEVED CONTEXT when the answer depends on retrieved documents.

If neither contains the answer, say you don't know.

Do not invent information.

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