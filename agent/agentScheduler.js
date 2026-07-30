const agents =
    require("../agents/agentRegistry");



async function agentScheduler(state) {


    console.log(
        "\n===== AGENT SCHEDULER ====="
    );


    const tasks =
        state.multiAgentPlan.agents;



    const completed =
        new Set();



    while(
        completed.size < tasks.length
    ){


        const runnableTasks =
            tasks.filter(task => {


                // already completed

                if(
                    completed.has(task.id)
                ){
                    return false;
                }



                // check dependencies

                return task.dependsOn.every(

                    dependency =>
                        completed.has(dependency)

                );


            });



        if(
            runnableTasks.length === 0
        ){

            throw new Error(
                "Circular dependency or invalid agent plan"
            );

        }



        console.log(
            "\nRunnable Agents:"
        );


        console.log(
            runnableTasks.map(
                task=>task.agent
            )
        );



        // ============================
        // Execute Parallel Agents
        // ============================


        await Promise.all(

            runnableTasks.map(

                async(task)=>{


                    console.log(
                        `Running Agent: ${task.agent}`
                    );



                    const agent =
                        agents[task.agent];



                    if(!agent){

                        console.log(
                            `Agent ${task.agent} not found`
                        );

                        return;

                    }



                    await agent(

                        state,

                        task

                    );



                    completed.add(
                        task.id
                    );


                    state.agentResults.push({

                        id:
                            task.id,

                        agent:
                            task.agent,

                        completed:
                            true

                    });


                }

            )

        );


    }



    console.log(
        "\n===== ALL AGENTS COMPLETED ====="
    );


    return state;


}



module.exports =
    agentScheduler;