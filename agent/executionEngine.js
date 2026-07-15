const tools =
    require("../tools/toolRegistry");

const llmExecutor =
    require("./llmExecutor");

async function executionEngine(
    plan,
    userMessage
) {

    const results = [];

    // ===========================
    // Backward Compatibility
    // ===========================

    if (!plan.steps || plan.steps.length === 0) {

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

    // ===========================
    // Step Executor
    // ===========================

    for (const step of plan.steps) {

        console.log(
            "\n=============================="
        );

        console.log(
            "EXECUTING STEP"
        );

        console.log(
            "=============================="
        );

        console.log(step);

        // ===========================
        // LLM Step
        // ===========================

        if (step.tool === "llm") {

            const result =
                await llmExecutor(

                    step,

                    results

                );

            results.push({

                task:
                    step.task,

                tool:
                    "llm",

                query:
                    step.query,

                result

            });

            continue;

        }

        // ===========================
        // Tool Step
        // ===========================

        const tool =
            tools[step.tool];

        if (!tool) {

            console.log(
                `Tool ${step.tool} not found.`
            );

            continue;

        }

        const result =
            await tool(
                step.query
            );

        results.push({

            task:
                step.task,

            tool:
                step.tool,

            query:
                step.query,

            result

        });

    }

    return results;

}

module.exports =
    executionEngine;