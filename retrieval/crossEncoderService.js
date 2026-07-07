const runPython =
    require("../python/pythonRunner");

async function rerank(
    query,
    documents
) {

    return await runPython(

        "cross_encoder/rerank.py",

        {

            query,

            documents

        }

    );

}

module.exports =
    rerank;