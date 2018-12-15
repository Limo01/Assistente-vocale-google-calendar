window.onload= function(){
    this.avatar= new Avatar();
    
    var s= "Inserisci verifica matematica ore 9:00 il 23 gennaio";
    
    
};

/*-----------------------------
      Global variables
------------------------------*/

var NOT_FOUND = -1; // index not found
var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var noteContent = '';

try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
}
catch(e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
}

/*-----------------------------
  App buttons and input
------------------------------*/

$('#start-record-btn').on('click', function(e) {
    if (noteContent.length) {
        noteContent += ' ';
    }
    recognition.start();
    instructions.text('Voice recognition turned on.');
});

$('#pause-record-btn').on('click', function(e) {
    recognition.stop();
    instructions.text('Voice recognition turned off.');
    interpret(noteContent);
});

$('#reset-btn').on('click', function(e) {
    console.log(noteContent);
    recognition.stop();
    instructions.text('');
    noteTextarea.val('');
    noteContent="";
    
    if (document.contains(document.getElementById("stud-img")))
        document.getElementById("stud-img").remove();
    if (document.contains(document.getElementById("demo")))
        document.getElementById("demo").remove();
});

$('#speak-btn').on('click', function(e) {
    recognition.stop();
    window.avatar.say(noteContent);
});

// Sync the text inside the text area with the noteContent variable.
noteTextarea.on('input', function() {
    noteContent = $(this).val();
});
