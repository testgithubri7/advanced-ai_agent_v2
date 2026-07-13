const fs =
    require("fs");

const path =
    require("path");

const getEmbedding =
    require("../retrieval/embeddingService");

async function addMemory(

    userId,

    userMessage,

    assistantMessage

) {

    const text =

`User:
${userMessage}

Assistant:
${assistantMessage}`;

    const embedding =
        await getEmbedding(
            text
        );

    const memory = {

        userId,

        text,

        embedding

    };

    const memoryStorePath =
        path.join(

            __dirname,

            "../memoryStore.json"

        );

    let memoryStore = [];

    if (

        fs.existsSync(
            memoryStorePath
        )

    ) {

        memoryStore =
            JSON.parse(

                fs.readFileSync(

                    memoryStorePath,

                    "utf8"

                )

            );

    }

    memoryStore.push(
        memory
    );

    fs.writeFileSync(

        memoryStorePath,

        JSON.stringify(

            memoryStore,

            null,

            2

        )

    );

    console.log(
        "\nMemory Added."
    );

}

module.exports =
    addMemory;