function createState(userMessage) {

    return {

        originalUserMessage: userMessage,

        userMessage,

        goal: "",

        plan: null,

        toolResults: [],

        retrievedContext: "",

        memory: "",

        observation: null,

        finalAnswer: "",

        done: false,

        iteration: 0

    };

}

module.exports = createState;