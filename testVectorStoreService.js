const getChunks =
    require(
        "./retrieval/vectorStoreService"
    );

const results = [

    {

        index:7,

        distance:0.41

    },

    {

        index:3,

        distance:0.72

    }

];

console.log(

    getChunks(results)

);