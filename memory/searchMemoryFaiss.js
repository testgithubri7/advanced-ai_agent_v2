const runPython =
    require("../python/pythonRunner");

async function searchMemoryFaiss(
    embedding
) {

    const result =
        await runPython(

            "memory_faiss/search_memory.py",

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
    searchMemoryFaiss;