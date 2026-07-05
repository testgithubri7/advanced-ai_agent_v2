const faissSearch =
    require("./faissService");

const getEmbedding =
    require("./embeddingService");

async function multiQueryRetriever(
    queries
) {

    const mergedResults =
        new Map();

    for (const query of queries) {

        console.log(
            `\nSearching for: ${query}`
        );

        const embedding =
    await getEmbedding(query);

const results =
    await faissSearch(embedding);

        for (const result of results) {

            const existing =
                mergedResults.get(
                    result.index
                );

            // Keep the smaller distance
            if (
                !existing ||
                result.distance <
                    existing.distance
            ) {

                mergedResults.set(

                    result.index,

                    result

                );

            }

        }

    }

    const finalResults =
        Array.from(
            mergedResults.values()
        );

    finalResults.sort(

        (a, b) =>

            a.distance -
            b.distance

    );

    console.log(
        "\nMerged Results:"
    );

    console.log(finalResults);

    return finalResults;

}

module.exports =
    multiQueryRetriever;