const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

async function sendMessage() {

    const input = document.getElementById("message");

    const message = input.value;

    const response = await fetch("/api/agent/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message
        })

    });

    const data = await response.json();

    document.getElementById("response").innerText = data.reply;
    speak(data.reply);
}