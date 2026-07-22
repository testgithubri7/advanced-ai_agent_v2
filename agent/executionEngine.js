const tools =
    require("../tools/toolRegistry");

const llmExecutor =
    require("./llmExecutor");

const executeStep =
    require("./executeStep");

async function executionEngine(
    steps,
    previousResults
) {

    const settledResults =
        await Promise.allSettled(

            steps.map(step =>

                executeStep(

                    step,

                    previousResults

                )

            )

        );

    const results = [];

    for (const result of settledResults) {

        if (result.status === "fulfilled") {

            results.push({

                success: true,

                ...result.value

            });

        }

        else {

            console.error(
                "Step Failed:",
                result.reason
            );

            results.push({

                success: false,

                error:
                    result.reason.message ||

                    "Unknown Error"

            });

        }

    }

    return results;

}

module.exports =
    executionEngine;