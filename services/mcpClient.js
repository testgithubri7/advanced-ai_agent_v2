
const path = require("path");

const {
    Client
}
=
require("@modelcontextprotocol/sdk/client/index.js");


const {
    StdioClientTransport
}
=
require("@modelcontextprotocol/sdk/client/stdio.js");


const MCP_SERVERS =
require("../config/mcp_servers.json");





let clients = [];

let toolMap = {};

let availableTools = [];


async function connectMCP(){


for(const server of MCP_SERVERS){


    const transport =
    new StdioClientTransport({

        command:
        server.command,

         args:
    server.args.map(arg => {

        return path.join(
            __dirname,
            arg
        );

    })

    });



    const client =
    new Client(

    {
        name:"ai-agent",
        version:"1.0.0"
    },

    {
        capabilities:{}
    }

    );



    await client.connect(
        transport
    );

    console.error(
    server.name,
    "MCP CONNECTED"
);

    client.onclose = () => {

    console.error(
        server.name,
        "MCP DISCONNECTED"
    );

};


    clients.push({

        name:server.name,

        client

    });

    console.log(
        `Connected to ${server.name} MCP Server`
    );

    const response =
await client.listTools();



response.tools.forEach(tool => {


    toolMap[tool.name] =
    client;


    availableTools.push(tool);


});

 console.log(
    "AVAILABLE MCP TOOLS:",
    Object.keys(toolMap)
);
}


}


async function getTools(){
    return availableTools;

}


async function callTool(
name,
args
){

      const client =
    toolMap[name];

    
     console.log(
        "CALLING MCP TOOL:",
        name
    );


    console.log(
        "CLIENT EXISTS:",
        !!client
    );


    console.log(
        "CLIENT TRANSPORT:",
        client?._transport?._process?.killed
    );

    if(!client){

        throw new Error(
            `MCP Tool ${name} not found`
        );

    }


    return await client.callTool({

        name,

        arguments:args

    });

}

async function getGeminiTools(){

    const tools =
    await getTools();


    return tools.map(tool => ({

        name:tool.name,

        description:tool.description,

        parameters:tool.inputSchema

    }));

}



module.exports={
    connectMCP,
    getTools,
    callTool,
    getGeminiTools
};