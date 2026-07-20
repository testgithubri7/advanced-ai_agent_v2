function buildScratchpadSummary(state) {

    if (state.scratchpad.length === 0) {
        return "Scratchpad is empty.";
    }

    let summary = "";

    for (const entry of state.scratchpad) {

        summary += `

----------------------------------------

Type : ${entry.type}

Task : ${entry.task}

`;

        switch (entry.type) {

            case "plan":

                summary += `Goal : ${entry.content.goal}

Steps :

`;

                for (const step of entry.content.steps) {

                    summary += `- ${step.task}
`;

                }

                break;

            case "tool":

                summary += `Result :

${entry.content}

`;

                break;

            case "memory":

                summary += `Relevant Memory :

${entry.content}

`;

                break;

            case "reflection":

                summary += `Satisfied : ${entry.content.satisfied}

Reason : ${entry.content.reason}

Next Action : ${entry.content.nextAction}

`;

                break;

            default:

                summary += `${JSON.stringify(entry.content, null, 2)}

`;

        }

    }

    return summary;

}

module.exports = buildScratchpadSummary;