let mcpTools = [];


function setTools(tools){

    mcpTools = tools;

}


function getTools(){

    return mcpTools;

}

function hasTool(name){

    return mcpTools.some(
        tool => tool.name === name
    );

}



module.exports={
    setTools,
    getTools,
    hasTool
};