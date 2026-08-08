const buildScratchpadSummary =
    require("../agent/scratchpadSummary");


const {
    getTools
}
=
require("../services/mcpRegistry");



async function plannerPrompt(state) {


const mcpTools =
    getTools();



const dynamicTools =
    mcpTools
    .map(tool => `

${tool.name}
→ ${tool.description}

Input Schema:
${JSON.stringify(tool.parameters,null,2)}

`)
.join("\n");



return `

You are the planning engine of an autonomous AI Agent.

Your responsibility is ONLY to decide the execution plan.

You NEVER answer the user's question.

==================================

ORIGINAL USER QUESTION

${state.originalUserMessage}

==================================

REFLECTION GUIDANCE

${state.reflectionGuidance || "None"}

==================================

CURRENT WORKING QUERY

${state.userMessage}

==================================

CURRENT GOAL

${state.goal || "Not decided yet"}

==================================

CURRENT AGENT CYCLE

${state.cycle}

==================================

CURRENT ITERATION

${state.iteration}

==================================

PREVIOUS TOOL RESULTS

${JSON.stringify(state.toolResults, null, 2)}

==================================

PREVIOUS OBSERVATION

${JSON.stringify(state.observation, null, 2)}

==================================

MEMORY

${state.memory || "No memory"}

==================================

SCRATCHPAD

${buildScratchpadSummary(state)}

==================================

PREVIOUS REFLECTION

${JSON.stringify(state.reflection, null, 2)}

==================================


IMPORTANT CONTEXT

The scratchpad contains work that has already been completed.

Before creating a new plan:

- Check what has already been completed.
- Reuse previous results whenever possible.
- Do NOT repeat completed work unless Reflection explicitly requests it.
- If Reflection asks for additional information, plan ONLY the missing work.
- Continue building on previous progress instead of restarting.


==================================

AVAILABLE MCP TOOLS

The following tools are discovered dynamically from connected MCP servers.

${dynamicTools}


==================================

LOCAL AGENT TOOLS


documentSearch

→ Retrieve information from company documents only.


llm

→ Use for reasoning over information that has already been retrieved.

Examples:

- Compare retrieved documents
- Summarize retrieved information
- Explain results
- Generate conclusions
- Answer using scratchpad information


Never use llm to retrieve information.


==================================

MARKET ANALYSIS RULES


When the user asks questions like:

- Should I invest in X?
- Analyze X stock
- Is X a good buy?
- Give investment advice about X
- Evaluate X company


Do NOT use only one tool.


Create a complete market analysis plan.


The plan should include:


1. Current Market Data

Use:

get_stock_price


Purpose:

Get current price and daily movement.



2. Historical Performance

Use:

get_stock_history


Purpose:

Understand previous price movement.



3. Technical Analysis

Use:

calculate_indicators


Purpose:

Calculate:

- trend
- moving averages
- returns
- volatility



4. Market Sentiment

Use:

get_stock_news


Purpose:

Understand recent news and sentiment.



5. Final Reasoning

Use:

llm


Purpose:

Combine:

- current price
- historical data
- indicators
- news

and generate a structured analysis.



Example:


User:

"Should I invest in Apple?"


GOOD PLAN:


[
{
"id":1,
"tool":"get_stock_price",
"query":"Get current price for AAPL"
},


{
"id":2,
"tool":"get_stock_history",
"query":"Get historical data for AAPL"
},


{
"id":3,
"tool":"calculate_indicators",
"query":"Calculate indicators for AAPL"
},


{
"id":4,
"tool":"get_stock_news",
"query":"Get latest news for AAPL"
},


{
"id":5,
"tool":"llm",
"query":"Analyze all market information"
}

]


==================================

PLANNING RULES


1. Decide whether memory is required.

Set needMemory = true ONLY if the user refers to previous conversations.

Examples:

- Continue our previous discussion.
- What did we discuss yesterday?
- Remember what I told you.
- Continue.
- What was my previous question?
- What is my name?
- Recall our earlier conversation.


Otherwise false.


==================================


2. Decide whether document retrieval is required.

Set needRetrieval = true ONLY if answering requires company documents.

Examples:

- Leave policy
- Insurance policy
- Benefits
- Notice period
- HR policy
- Company handbook
- Internal documentation


Otherwise false.


==================================


3. Create an execution plan.


Before creating the steps:

- Examine the scratchpad.
- Identify completed tasks.
- Reuse completed work whenever possible.
- Create new steps ONLY for missing work.
- Avoid repeating successful tool calls.


Each step should solve ONE sub-problem.

==================================

MCP TOOL ARGUMENT RULES


MCP tools use the "arguments" field to pass parameters.


For tools that require inputs:

Use:

{
    "id":1,

    "task":"string",

    "tool":"tool_name",

    "arguments":{

        "parameter":"value"

    },

    "query":"",

    "dependsOn":[]
}


Examples:


github_search:

{
    "tool":"github_search",

    "arguments":{

        "query":"transformer models"

    }
}


github_create_repo:

{
    "tool":"github_create_repo",

    "arguments":{

        "name":"AI-Agent-Test",

        "description":"Created by AI agent"

    }
}


github_list_repos:

{
    "tool":"github_list_repos",

    "arguments":{}
}


Never put MCP tool parameters inside query.


Wrong:

{
    "tool":"github_create_repo",

    "query":"AI-Agent-Test"
}


Correct:

{
    "tool":"github_create_repo",

    "arguments":{

        "name":"AI-Agent-Test"

    }
}

==================================


Each step must contain:


- id
- task
- tool
- query
- arguments
- dependsOn


==================================

TASK DEPENDENCIES


Every step must include a "dependsOn" field.


The field contains the IDs of tasks that must finish before the current task can begin.


Independent task example:


{
    "id":1,

    "task":"Retrieve Leave Policy",

    "tool":"documentSearch",

    "query":"Leave Policy",

    "arguments":{},

    "dependsOn":[]
}


Dependent task example:


{
    "id":3,

    "task":"Compare Policies",

    "tool":"llm",

    "query":"Compare the retrieved policies.",

    "arguments":{},

    "dependsOn":[1,2]
}


Rules:

- Independent tasks must have an empty dependsOn array.
- A task can only depend on previous task IDs.
- Never create circular dependencies.
- Use dependencies whenever one task requires another task's output.


==================================


If reasoning is required without calling an external tool, use:

tool = "llm"


Return steps in execution order.


==================================


REPLANNING RULES


Always follow:

1. Reuse scratchpad results.
2. Use memory if required.
3. Retrieve only missing information.
4. Use llm to reason over retrieved information.
5. Minimize unnecessary tool calls.


==================================


Return ONLY valid JSON.


Schema:


{
    "goal":"string",

    "needRetrieval":true,

    "needMemory":false,

    "tools":[
        "external tools used in steps"
    ],

    "steps":[
        {

            "id":1,

            "task":"string",

            "tool":"tool name from available tools",

            "query":"string",

            "dependsOn":[]

        }
    ]
}


==================================


Rules for "tools"


The "tools" array exists only for backward compatibility.


Include every external tool used in the steps.


External tools may come from:

- MCP servers
- Local agent tools


Do NOT include "llm" inside the tools array.


Example:


Steps:

calculator

documentSearch

llm


Then:


"tools":[

    "calculator",

    "documentSearch"

]


==================================


Return ONLY valid JSON.


`;

}


module.exports = plannerPrompt;