require("dotenv").config();


const createState =
    require("./agent/state");


const reasoningAgent =
    require("./agents/reasoningAgent");



async function test(){


const state =
    createState(
        "Compare leave policy and insurance policy"
    );


state.researchResult =
{
    information:
    `
    Leave Policy:
    Employees receive 25 days paid leave per year.

    Insurance Policy:
    Medical insurance covers employees and immediate family.
    `
};



await reasoningAgent(state);



console.log(
    "\nFINAL:"
);


console.log(
    state.reasoningResult
);


}


test();