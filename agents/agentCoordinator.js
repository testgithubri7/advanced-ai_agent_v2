const agents =
    require("./agentRegistry");


async function agentCoordinator(
    state
) {

    console.log(
        "\n===== AGENT COORDINATOR =====\n"
    );


    const selectedAgents =
        state.agentPlan?.agents || [];


    state.agentResults = [];


    for (const agentName of selectedAgents) {


        console.log(
            `Running Agent: ${agentName}`
        );


        const agent =
            agents[agentName];


        if (!agent) {

            console.log(
                `Agent ${agentName} not found`
            );

            continue;

        }


        await agent(state);


        state.agentResults.push({

            agent:
                agentName,

            completed:
                true

        });


    }


    return state;

}


module.exports =
    agentCoordinator;