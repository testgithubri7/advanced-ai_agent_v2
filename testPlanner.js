require("dotenv").config();

const planner =
    require("./agent/planner");

async function test() {

    const result =
        await planner(

            "Calculate 250*30"

        );

    console.log(result);

}

test();