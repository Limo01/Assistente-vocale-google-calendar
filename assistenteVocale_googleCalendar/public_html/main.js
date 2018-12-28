window.onload= function(){
    this.avatar= new Avatar(); 
    
    document.getElementById("infoButton").onclick= function()
    {
        var footer=document.getElementById("footer");
        
        if(footer.attributes.class.nodeValue==="show")
        {
            footer.attributes.class.nodeValue= undefined;
        }
        else
        {
            footer.attributes.class.nodeValue= "show";
        }
    };
};

/*-----------------------------
      Global variables
------------------------------*/

var NOT_FOUND = -1; // index not found
var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var noteContent = '';
var mesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

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
    reset();
    recognition.start();
    instructions.text('Voice recognition turned on.');
});

$('#pause-record-btn').on('click', function(e) {
    recognition.stop();
    instructions.text('Voice recognition turned off.');
    interpret(noteContent);
});

$('#reset-btn').on('click', function(e) {
    reset();
});

$('#speak-btn').on('click', function(e) {
    recognition.stop();
    window.avatar.say(noteContent);
});

// Sync the text inside the text area with the noteContent variable.
noteTextarea.on('input', function() {
    noteContent = $(this).val();
});

function reset()
{
    recognition.stop();
    instructions.text('');
    noteTextarea.val('');
    noteContent="";
    
    document.getElementById("responseSpan").innerHTML= "";
}

