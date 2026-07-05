require("dotenv").config();

const express =
    require("express");

const cors =
    require("cors");

const connectDB =
    require("./config/database");

const agentRoutes =
    require("./routes/agentRoutes");

const app =
    express();

app.use(cors());

app.use(express.json());

app.use(
    "/api/agent",
    agentRoutes
);

const PORT =
    process.env.PORT || 5000;

async function startServer() {

    try {

        // 1. Connect to MongoDB first
        await connectDB();

        // 2. Start Express server only after DB connection
        app.listen(PORT, () => {

            console.log(
                `Server running on port ${PORT}`
            );

        });

    }
    catch (err) {

        console.error(
            "Failed to start server:",
            err
        );

        process.exit(1);

    }

}

startServer();