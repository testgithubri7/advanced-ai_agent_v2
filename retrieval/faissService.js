const { spawn } = require("child_process");
const path = require("path");

function searchFaiss(queryEmbedding) {

    return new Promise((resolve, reject) => {

        // Use Python from PATH
        const pythonPath = "python";

        // New location of search script
        const scriptPath = path.join(
            __dirname,
            "../faiss/search_faiss.py"
        );

        console.log("Python:", pythonPath);
        console.log("Script:", scriptPath);

        const pythonProcess = spawn(
            pythonPath,
            [scriptPath]
        );

        let result = "";
        let error = "";

        pythonProcess.stdout.on(
            "data",
            (data) => {
                result += data.toString();
            }
        );

        pythonProcess.stderr.on(
            "data",
            (data) => {
                error += data.toString();
            }
        );

        pythonProcess.on(
            "error",
            (err) => {
                reject(err);
            }
        );

        pythonProcess.on(
            "close",
            (code) => {

                if (code !== 0) {

                    return reject(
                        new Error(error)
                    );

                }

                try {

                    const parsedResult =
                        JSON.parse(result);

                   const formattedResults = parsedResult.indices.map(

    (index, i) => ({

        index,

        distance: parsedResult.distances[i]

    })

);

resolve(formattedResults);
                }
                catch (err) {

                    reject(err);

                }

            }
        );

        pythonProcess.stdin.write(

            JSON.stringify({

                embedding:
                    queryEmbedding

            })

        );

        pythonProcess.stdin.end();

    });

}

module.exports = searchFaiss;