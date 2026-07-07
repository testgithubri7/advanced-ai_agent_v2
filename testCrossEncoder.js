require("dotenv").config();

const rerank =
    require("./retrieval/crossEncoderService");

async function test() {

    const query =
        "leave policy";

    const documents = [

        {

            source:
                "company.txt",

            chunk:
                "Notice period is 60 days.",

            distance:
                0.41

        },

        {

            source:
                "company.txt",

            chunk:
                "Employees receive 25 days of paid leave per year.",

            distance:
                0.72

        },

        {

            source:
                "company.txt",

            chunk:
                "Leave requests must be approved by the manager.",

            distance:
                0.85

        }

    ];

    const results =
        await rerank(
            query,
            documents
        );

    console.log("\nRERANKED RESULTS\n");

    console.log(results);

}

test();