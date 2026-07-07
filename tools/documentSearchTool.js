const expandQuery =
    require("../retrieval/queryExpansion");

const multiQueryRetriever =
    require("../retrieval/multiQueryRetriever");

const getChunks =
    require("../retrieval/vectorStoreService");

const rerank =
    require("../retrieval/crossEncoderService");

const compress =
    require("../retrieval/contextCompression");

async function documentSearchTool(query) {

    console.log("\n========== DOCUMENT SEARCH ==========\n");

    // Step 1
    console.log("1. Expanding Query...");
    const expandedQueries =
        await expandQuery(query);

    console.log(expandedQueries);

    // Step 2
    console.log("\n2. Running Multi Query Retrieval...");
    const retrievedResults =
        await multiQueryRetriever(
            expandedQueries
        );

    console.log(retrievedResults);

    // Step 3
    console.log("\n3. Mapping Indices To Chunks...");
    const chunks =
        getChunks(
            retrievedResults
        );

    console.log(chunks);

    // Step 4
    console.log("\n4. Cross Encoder Re-ranking...");
    const rerankedResults =
        await rerank(
            query,
            chunks
        );

    console.log(rerankedResults);

    // Step 5
    console.log("\n5. Compressing Context...");

const context = rerankedResults
    .map(doc => `[Source: ${doc.source}]
${doc.chunk}`)
    .join("\n\n");

const finalContext =
    await compress(
        query,
        context
    );

console.log(finalContext);

    return finalContext;

}

module.exports =
    documentSearchTool;