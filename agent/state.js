function createState(userMessage) {

    return {

        // ==========================
        // User
        // ==========================

        originalUserMessage: userMessage,

        userMessage,

        // ==========================
        // Planning
        // ==========================

        goal: "",

        plan: null,

        // ==========================
        // Memory
        // ==========================

        memory: "",

        // ==========================
        // Retrieval
        // ==========================

        retrievedContext: "",

        // ==========================
        // Agent Scratchpad
        // (We'll build this next)
        // ==========================

        toolResults: [],

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

module.exports = createState;