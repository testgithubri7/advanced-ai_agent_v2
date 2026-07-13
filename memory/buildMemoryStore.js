const fs = require("fs");
const path = require("path");

require("dotenv").config();
const connectDB =
    require("../config/database");

const Conversation =
    require("../models/Conversation");

const getEmbedding =
    require("../retrieval/embeddingService");

async function buildMemoryStore() {

    // Connect to MongoDB
    await connectDB();

    console.log(
        "\n===== BUILDING MEMORY STORE =====\n"
    );

    const conversations =
        await Conversation.find();

    const memoryStore = [];

    for (const conversation of conversations) {

        const messages =
            conversation.messages;

        for (
            let i = 0;
            i < messages.length - 1;
            i += 2
        ) {

            const user =
                messages[i];

            const assistant =
                messages[i + 1];

            const text =
`User:
${user.content}

Assistant:
${assistant.content}`;

            console.log("\nEmbedding Memory:");
            console.log(text);

            const embedding =
                await getEmbedding(text);

            memoryStore.push({

                userId:
                    conversation.userId,

                text,

                embedding

            });

        }

    }

    const outputPath =
        path.join(
            __dirname,
            "..//memoryStore.json"
        );

    fs.writeFileSync(
        outputPath,
        JSON.stringify(
            memoryStore,
            null,
            2
        )
    );

    console.log(
        "\nMemory Store Saved."
    );

    console.log(
        "Total Memories:",
        memoryStore.length
    );

    process.exit(0);

}

buildMemoryStore().catch(err => {

    console.error(err);

    process.exit(1);

});