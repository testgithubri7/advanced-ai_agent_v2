const planner =
    require("./planner");

const executionEngine =
    require("./executionEngine");

const promptBuilder =
    require("./promptBuilder");

async function agentService(
    message
) {

    console.log(
        "\n========== AGENT START =========="
    );

    console.log(
        "User:",
        message
    );

    // Step 1
    const plan =
        await planner(
            message
        );

    console.log(
        "\nPlanner Output:"
    );

    console.log(plan);

    // Step 2
    const execution =
        await executionEngine(
            plan
        );

    console.log(
        "\nExecution Output:"
    );

    console.log(execution);

    // Step 3
    const prompt =
        promptBuilder(
            execution
        );

    console.log(
        "\nPrompt:"
    );

    console.log(prompt);

    console.log(
        "\n========== AGENT END ==========\n"
    );

    return "Agent Pipeline Working 🚀";

}

module.exports =
    agentService;