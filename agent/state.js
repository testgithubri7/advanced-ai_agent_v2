function createState(userMessage) {

    return {

        // ==========================
        // User
        // ==========================

        originalUserMessage:
            userMessage,

        userMessage,


        // ==========================
        // Planning
        // ==========================

        goal: "",

        plan: null,


        // ==========================
        // Agent Routing
        // ==========================

        // Output from Agent Router
        // Example:
        // {
        //   agents:[
        //      "research",
        //      "reasoning",
        //      "answer"
        //   ]
        // }

        agentPlan: null,


        // ==========================
        // Agent Execution
        // ==========================

        // Track which agents ran

        agentResults: [],


        // Research Agent output

        researchResult: null,


        // Reasoning Agent output

        reasoningResult: null,



        // ==========================
        // Memory
        // ==========================

        memory: "",



        // ==========================
        // Retrieval
        // ==========================

        retrievedContext: "",



        // ==========================
        // Tool Execution
        // ==========================

        toolResults: [],

        workspace: {},



        // ==========================
        // Agent Scratchpad
        // ==========================

        scratchpad: [],



        // ==========================
        // Observer
        // ==========================

        observation: null,



        // ==========================
        // Reflection
        // ==========================

        reflection: null,

        reflectionGuidance: "",



        // ==========================
        // Final Output
        // ==========================

        finalAnswer: "",



        // ==========================
        // Loop Control
        // ==========================

        done: false,

        iteration: 0,

        cycle: 0

    };

}


module.exports =
    createState;