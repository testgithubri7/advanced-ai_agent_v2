require("dotenv").config();

const createState =
    require("./agent/state");

const researchAgent =
    require("./agents/researchAgent");


async function test() {


    const state =
        createState(
            "Compare leave policy and insurance policy"
        );


    console.log(
        "\n===== BEFORE RESEARCH ====="
    );

    console.log(state);


    await researchAgent(state);


    console.log(
        "\n===== AFTER RESEARCH ====="
    );


    console.log(
        JSON.stringify(
            state.researchResult,
            null,
            2
        )
    );


}


test();