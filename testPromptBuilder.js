const buildPrompt =
require("./agent/promptBuilder");

const prompt = buildPrompt({

    userMessage:
        "What is the leave policy?",

    retrievedContext:
        "Employees receive 25 days leave.",

    memory:
        "User previously asked about HR policies.",

    toolResults:
        ""

});

console.log(prompt);