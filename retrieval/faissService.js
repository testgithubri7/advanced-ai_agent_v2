const runPython =
    require("../python/pythonRunner");

async function searchFaiss(
    embedding
) {

    const result =
        await runPython(

            "faiss/search_faiss.py",

            {

                embedding

            }

        );

    return result.indices.map(

        (index, i) => ({

            index,

            distance:

                result.distances[i]

        })

    );

}

module.exports =
    searchFaiss;