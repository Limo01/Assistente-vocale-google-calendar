/*-----------------------------
      Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = true;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function(event) {

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

  if(!mobileRepeatBug) {
      noteContent += transcript;
      noteTextarea.val(noteContent);
      interpret(noteContent);
  }
};


recognition.onspeechend = function() {
    if (! instructions.valueOf() == 'Voice recognition turned off.')
        instructions.text('You were quiet for a while so voice recognition turned itself off.');
};

recognition.onerror = function(event) {
    if(event.error == 'no-speech')
        instructions.text('No speech was detected. Try again.');
};

/*
@param String line
*/
function interpret(line) {
    if(line.indexOf("prossimi eventi")>=0)
    {
        listUpcomingEvents();
    }
    
    if(line.indexOf("inserisci evento")>=0)
    {
        addEvevntToCalendar("2019-01-1", "09:00:00", "10:00:00", "capodanno");
    }
}