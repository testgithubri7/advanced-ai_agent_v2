const createState =
    require("./state");


const retrieveMemory =
    require("../memory/memoryService");


const coordinator =
    require("./coordinator");

const persistencePhase =
    require("./persistencePhase");


async function chat(userMessage) {

    // STEP 1 - Create Agent State
    const state =
        createState(userMessage);

    
   await coordinator(
    state
);

   //step 5- Persistence Phase (saving and adding the moemory to the database)
   await persistencePhase(
    state
);

return state.finalAnswer;



}

module.exports = {
    chat
};