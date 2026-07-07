require("dotenv").config();

const documentSearchTool =
    require("./tools/documentSearchTool");

async function test() {

    const result =
        await documentSearchTool(

            "leave policy"

        );

    console.log("\n====================");
    console.log("FINAL CONTEXT");
    console.log("====================\n");

    console.log(result);

}

test();