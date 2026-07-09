require("dotenv").config();

const observe =
    require("./agent/observer");

async function test() {

    const state = {

        userMessage:
            "Compare leave policy and insurance policy.",

        goal:
            "Compare leave policy and insurance policy.",

        toolResults: [

            {
                tool: "documentSearch",

                result:
                    `Employees receive 25 days of paid leave per year.
                     Unused leave can be carried forward for one year.`

            }

        ]

    };

    const decision =
        await observe(state);

    console.log("\n===== OBSERVER DECISION =====\n");

    console.log(decision);

}

test();