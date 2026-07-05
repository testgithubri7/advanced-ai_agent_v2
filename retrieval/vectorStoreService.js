const fs =
    require("fs");

const path =
    require("path");

const vectorStorePath =
    path.join(
        __dirname,
        "../vectorstore/vectorStore.json"
    );

const vectorStore =
    JSON.parse(

        fs.readFileSync(
            vectorStorePath,
            "utf8"
        )

    ).vectors;

function getChunks(results) {

    return results.map(

        result => ({

            source:
                vectorStore[result.index].source,

            chunk:
                vectorStore[result.index].chunk,

            distance:
                result.distance

        })

    );

}

module.exports =
    getChunks;