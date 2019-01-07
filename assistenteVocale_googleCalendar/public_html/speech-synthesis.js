/*-----------------------------
      Speech Synthesis
------------------------------*/

function readOutLoud(message) {
    window.utterances = [];
    var speech = new SpeechSynthesisUtterance();
    utterances.push(speech);

    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
    
    /*
     * @brief funzione che viene chiamata quando window.speechSynthesis.speak smette di parlare
     */
    speech.onend = function(event) {
        window.avatar.smettiDiParlare();
    };
}