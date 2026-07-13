const fs =
    require("fs");

const path =
    require("path");

const getEmbedding =
    require("../retrieval/embeddingService");

const searchMemoryFaiss =
    require("./searchMemoryFaiss");

async function semanticMemoryService(
    question
) {

    console.log(
        "\n===== SEMANTIC MEMORY SEARCH =====\n"
    );

    // Generate query embedding
    const embedding =
        await getEmbedding(question);

    // Search Memory FAISS
    const results =
        await searchMemoryFaiss(
            embedding
        );

    console.log(results);

    // Load memory store
    const memoryStore =
        JSON.parse(

            fs.readFileSync(

                path.join(

                    __dirname,

                    "../memoryStore.json"

                ),

                "utf8"

            )

        );

    // Map indices → memories
    const memories =
    results

        .filter(item => item.index !== -1)

        .map(item => ({

            text:
                memoryStore[item.index].text,

            distance:
                item.distance

        }));

    return memories;

}

module.exports =
    semanticMemoryService;