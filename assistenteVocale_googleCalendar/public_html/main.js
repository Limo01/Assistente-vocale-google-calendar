window.onload= function(){
    this.avatar= new Avatar();
    setTimeout(function(){console.log("5000")}, 5000);
    //this.avatar.iniziaAparlare("ciao.");
    //setTimeout(this.avatar.smettiDiParlare, 5000);
};

/*-----------------------------
      Global variables
------------------------------*/

var bad_words = ["cavolo", "accidenti"];
var commands = ["nota", "foto", "avvertimento", "spaggiari"];
var Commands = {
    NOTA: 0,
    FOTO: 1,
    AVVERTIMENTO: 2,
    SPAGGIARI: 3,
    NONE: -1
};
var NOT_FOUND = -1; // index not found
var name_list_3IC = ["ABDUL KAYYOUM", "GIACOMO", "ELIA", "GIACOMO", "TOMMASO", "OLEKSANDR", "JESSICA",
    "ELENA", "CARLO", "TOMMASO", "VALENTIN", "ION", "MARCO", "FABIO", "TOMMASO", "LORENZO", "JAA HAO",
    "IVAN", "LORENZO", "NICOLO'", "MARCO"];
var surname_list_3IC = [ "ABUBAKAR", "BASATO", "CORO'", "DAVANZO", "FASSINA", "KIRPACHOV", "MAGRIS", "MARCHI",
    "MAVARACCHIO", "MICAGLIO", "NECULA", "PAHOMOV", "PIAZZON", "PIZZO", "RIZZO", "ROSSON", "RUAN", "SMIRNOV",
    "VACCHER", "VOLTAREL", "ZANOCCO"];
var picture_list_3IC = [ "S5542162H", "S5218919S", "S5542208M", "S5542219V", "S5542233F", "S6144974K", "S5542256Q",
    "S5542259J", "S5542265J", "S5542268A", "S5542273V", "S5229303G", "S5542284F", "S5218931K", "S5542294J",
    "S5542294W", "S5542295M", "S5542302L", "", "S5542318E", "S5218937N"];
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
    window.avatar.iniziaAparlare(noteContent);
});

// Sync the text inside the text area with the noteContent variable.
noteTextarea.on('input', function() {
    noteContent = $(this).val();
});
