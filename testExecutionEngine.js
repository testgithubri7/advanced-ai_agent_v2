const executionEngine =
    require("./agent/executionEngine");

async function test() {

    const plan = {

        goal:

            "Compare",

        needRetrieval:

            true,

        needMemory:

            false,

        tools: [

            "documentSearch"

        ]

    };

    const result =
        await executionEngine(
            plan
        );

    console.log(result);

}

test();