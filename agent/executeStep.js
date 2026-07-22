const tools = require("../tools/toolRegistry");
const llmExecutor = require("./llmExecutor");

async function executeStep(step, previousResults) {

    console.log("\n==============================");
    console.log("EXECUTING STEP");
    console.log("==============================");
    console.log(step);

    // ==========================
    // LLM Step
    // ==========================

    if (step.tool === "llm") {

        const result = await llmExecutor(
            step,
            previousResults
        );

        return {
            id: step.id,
            task: step.task,
            tool: "llm",
            query: step.query,
            result
        };
    }

    // ==========================
    // Tool Step
    // ==========================

    const tool = tools[step.tool];

    if (!tool) {

        throw {

    task: step.task,

    tool: step.tool,

    message:
        `Tool ${step.tool} not found.`

};
    }

    const result = await tool(step.query);

    return {

        id: step.id,

        task: step.task,

        tool: step.tool,

        query: step.query,

        result

    };

}

module.exports = executeStep;