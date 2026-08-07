const tools = require("../tools/toolRegistry");
const llmExecutor = require("./llmExecutor");
const {
    callTool
}
=
require("../services/mcpClient");

const {
    hasTool
}
=
require("../services/mcpRegistry");

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

   let result;


// First check MCP tools

// ==========================
// MCP TOOL
// ==========================

if(hasTool(step.tool)){


    console.log(
        "Executing MCP Tool:",
        step.tool
    );


    const response =
    await callTool(

        step.tool,

        step.arguments || {}

    );


    result =
    response.content[0].text;


}



// ==========================
// LOCAL TOOL
// ==========================

else{


    console.log(
        "Executing Local Tool:",
        step.tool
    );


    const tool =
    tools[step.tool];


    if(!tool){

        throw {

            task:step.task,

            tool:step.tool,

            message:
            `Tool ${step.tool} not found`

        };

    }


    result =
    await tool(step.query);


}
    return {

        id: step.id,

        task: step.task,

        tool: step.tool,

        query: step.query,

        result

    };

}

module.exports = executeStep;