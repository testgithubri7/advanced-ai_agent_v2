const documentSearchTool =
    require("./documentSearchTool");

const tools = {

    weather:

        async () => {

            return "Weather Tool Executed";

        },

    calculator:

        async () => {

            return "Calculator Tool Executed";

        },

    documentSearch:

        async (query) => {

            return await documentSearchTool(query);

        }

};

module.exports = tools;