const ai =
    require("../config/gemini");

const reflectionPrompt =
    require("../prompts/reflectionPrompt");



async function reflector(

    question,

    answer,

   scratchpadSummary

) {

    const prompt =
        reflectionPrompt(

            question,

            answer,

            scratchpadSummary

        );

    const response =
        await ai.models.generateContent({

            model:
                "gemini-2.5-flash",

            contents:
                prompt

        });

    const text =
        response.text
            .trim();

    const cleaned =
        text

            .replace(/```json/g, "")

            .replace(/```/g, "")

            .trim();

    console.log(
        "\n===== REFLECTION =====\n"
    );

    console.log(cleaned);

    return JSON.parse(cleaned);

}

module.exports =
    reflector;