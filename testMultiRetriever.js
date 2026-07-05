require("dotenv").config();

const multiQueryRetriever =
    require(
        "./retrieval/multiQueryRetriever"
    );

async function test() {

    const queries = [

        "notice period",

        "employee notice period",

        "resignation notice"

    ];

    const results =
        await multiQueryRetriever(
            queries
        );

    console.log(
        "\nFINAL RESULTS"
    );

    console.log(results);

}

test();