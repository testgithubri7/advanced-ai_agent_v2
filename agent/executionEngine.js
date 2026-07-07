const tools =
    require("../tools/toolRegistry");

async function executionEngine(
    plan,
    userMessage
) {

    const results = [];

    for (const toolName of plan.tools) {

        console.log(
            `Executing Tool: ${toolName}`
        );

        const tool =
            tools[toolName];

        if (!tool) {

            console.log(
                `Tool ${toolName} not found.`
            );

            continue;

        }

        const result =
            await tool(userMessage);

        results.push({

            tool: toolName,

            result

        });

    }

    return results;

}

module.exports =
    executionEngine;