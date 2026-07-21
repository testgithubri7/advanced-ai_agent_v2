// ---------------------------
// Text To Speech
// ---------------------------

function speak(text) {

    const utterance =
        new SpeechSynthesisUtterance(text);

    speechSynthesis.speak(utterance);

}


// ---------------------------
// Speech To Text
// ---------------------------

const micBtn =
    document.getElementById("micBtn");

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

const recognition =
    new SpeechRecognition();

recognition.lang = "en-US";

recognition.interimResults = false;

recognition.maxAlternatives = 1;

micBtn.addEventListener("click", () => {

    recognition.start();

});


recognition.onresult = (event) => {

    console.log("RESULT RECEIVED");

    const transcript = event.results[0][0].transcript;

    console.log(transcript);

    document.getElementById("message").value = transcript;

};

recognition.onerror = (event) => {

    console.error(
        "Speech recognition error:",
        event.error
    );  

}
