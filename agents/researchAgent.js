const tools = require("../tools/toolRegistry");

async function researchAgent(state, task) {

    console.log("\n===== RESEARCH AGENT =====");

    const query = state.userMessage;

    const documentSearch = tools.documentSearch;

    if (!documentSearch) {
        throw new Error("documentSearch tool missing");
    }

    const result = await documentSearch(query);

    state.workspace.research = {

        task: task.task,

        findings: result,

        completed: true,

        timestamp: Date.now()

    };

    console.log("\n===== RESEARCH RESULT =====");

    console.log(state.workspace.research);

    return state;
}

module.exports = researchAgent;