const { spawn } = require("child_process");

const path = require("path");

async function runPython(
    scriptRelativePath,
    inputData
) {

    return new Promise((resolve, reject) => {

        const pythonPath = "python";

        const scriptPath = path.join(

            __dirname,

            "..",

            scriptRelativePath

        );

        const process = spawn(

            pythonPath,

            [scriptPath]

        );

        let output = "";

        let error = "";

        process.stdout.on(

            "data",

            data => {

                output += data.toString();

            }

        );

        process.stderr.on(

            "data",

            data => {

                error += data.toString();

            }

        );

        process.on(

            "error",

            reject

        );

        process.on(

            "close",

            code => {

                if (code !== 0) {

                    return reject(

                        new Error(error)

                    );

                }

                try {

                    resolve(

                        JSON.parse(output)

                    );

                }

                catch (err) {

                    reject(err);

                }

            }

        );

        process.stdin.write(

            JSON.stringify(

                inputData

            )

        );

        process.stdin.end();

    });

}

module.exports = runPython;