const researchAgent =
    require("./researchAgent");


const reasoningAgent =
    require("./reasoningAgent");


const answerAgent =
    require("./answerAgent");


const agents = {

    research:
        researchAgent,


    reasoning:
        reasoningAgent,


    answer:
        answerAgent

};


module.exports = agents;