const express =
    require("express");

const router =
    express.Router();

const agentService =
    require("../agent/agentService");

router.post(
    "/chat",
    async (req, res) => {

        try {

            const { message } =
                req.body;

            const reply =
                await agentService.chat(
                    message
                );

            res.json({

                success: true,

                reply

            });

        }
        catch (err) {

            res.status(500).json({

                success: false,

                error:
                    err.message

            });

        }

    }
);

module.exports =
    router;