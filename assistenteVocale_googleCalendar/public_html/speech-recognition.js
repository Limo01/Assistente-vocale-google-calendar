/*-----------------------------
 Voice Recognition 
 ------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = true;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function (event) {

    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far. 
    // We only need the current one.
    var current = event.resultIndex;

    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;

    // Add the current transcript to the contents of our Note.
    // There is a weird bug on mobile, where everything is repeated twice.
    // There is no official solution so far so we have to handle an edge case.
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if (!mobileRepeatBug) {
        noteContent += transcript;
        noteTextarea.val(noteContent);
        interpret(noteContent);
    }
};


recognition.onspeechend = function () {
    if (!instructions.valueOf() == 'Voice recognition turned off.')
        instructions.text('You were quiet for a while so voice recognition turned itself off.');
};

recognition.onerror = function (event) {
    if (event.error == 'no-speech')
        instructions.text('No speech was detected. Try again.');
};

/*
 @param String line
 */
function interpret(line) {
    if (line.indexOf("Prossimi eventi") >= 0)
    {
        listUpcomingEvents();
    } 
    else if (line.indexOf("Aggiungi") === 0 || line.indexOf("Inserisci") === 0)
    {
        var dati = parseEvent(line);
        if (dati !== undefined)
        {
            addEventToCalendar(dati.data, dati.ora, dati.summary);
        }
    }
    else if (line==="Opzioni" || line==="Comandi")
    {
        document.getElementById("infoButton").onclick();
        window.avatar.say("Eccoli!");
    }
}

function parseEvent(s)
{
    var sElement = s.split(" ");
    var indiceOre = undefined;
    for (var i = 0; i < sElement.length; i++)
    {
        if (sElement[i] === "ore")
            indiceOre = i;
    }

    var summary = undefined;
    if (indiceOre !== undefined && indiceOre > 1 && indiceOre !== sElement.length - 1)
    {
        summary = sElement[1];
        for (var i = 2; i < indiceOre; i++)
        {
            summary += " " + sElement[i];
        }
    }

    var ora = sElement[indiceOre + 1];

    var data = undefined;

    if (indiceOre + 4 === sElement.length - 1)
    {
        var dataAttuale = new Date();
        var mesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
        var mese = mesi.indexOf(sElement[indiceOre + 4]) + 1;
        var anno = (mese >= dataAttuale.getMonth()) ? dataAttuale.getFullYear() : dataAttuale.getFullYear() + 1;
        var giorno = sElement[indiceOre + 3];
        data = anno + "-" + mese + "-" + giorno;
    }

    if (summary !== undefined && ora !== undefined && data !== undefined)
    {
        return {"summary": summary, "data": data, "ora": ora};
    } else
    {
        return undefined;
    }
};