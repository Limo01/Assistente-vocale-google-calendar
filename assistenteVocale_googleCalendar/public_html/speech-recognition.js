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
function indexOfBadWord(line){
    console.log("inizio indexOfBadWord("+line+")");
    const list = line.split(" ");
    let i, j;
    for (i = 0; i < list.length; i++){
        for (j = 0; j < bad_words.length; j++){
            if (list[i].toLocaleLowerCase().localeCompare(bad_words[j].toLocaleLowerCase()) == 0){
                console.log("fine indexOfBadWord("+line+")");
                return j;
            }
        }
    }
    console.log("fine indexOfBadWord("+line+")");
    return NOT_FOUND;
}

/*
@param String command
*/
function indexOfCommand(command){
    console.log("inizio indexOfCommand("+command+")");
    const command_min = command.toLocaleLowerCase();
    let j;
    for (j = 0; j < commands.length; j++){
        if (commands[j].toLocaleLowerCase().localeCompare(command_min) == 0){
            console.log("fine indexOfCommand("+command+")");
            return j;
        }
    }
    console.log("fine indexOfCommand("+command+")");
    return NOT_FOUND;
}

/*
@param String studente
*/
function indexOfStudent(student){
    console.log("inizio indexOfStudent("+student+")");
    const n = name_list_3IC.length;
    const student_min = student.toLocaleLowerCase();
    let j;
    for (j = 0; j < n; j++){
        if (name_list_3IC[j].toLocaleLowerCase().localeCompare(student_min) == 0
            || surname_list_3IC[j].toLocaleLowerCase().localeCompare(student_min) == 0
        )
            return j; // found student at position j
    }
    console.log("fine indexOfStudent("+student+")");
    return NOT_FOUND;
}

/*
@param String student
*/
function showPicture(student) {
    console.log("inizio showPicture("+student+")");
    var index_of_student = indexOfStudent(student);
    if (index_of_student != NOT_FOUND){
        var base_img_url = 'https://web.spaggiari.eu/configs/lib/php/wideimage/image.php?sede_codice=VEIT0007&image=get_img&qu=90&imgurl=studenti/VEIT0007/';
        var img_url = base_img_url+picture_list_3IC[index_of_student]+"/fototessera_"+picture_list_3IC[index_of_student]+".jpg";
        var stud_img = document.createElement("img");
        stud_img.setAttribute("src", img_url);
        stud_img.setAttribute("width", "100");
        stud_img.setAttribute("height", "100");
        stud_img.setAttribute("border", "1px");
        stud_img.setAttribute("id", "stud-img");
        document.body.appendChild(stud_img);
    }
    console.log("fine showPicture("+student+")");
}

function showSpaggiari() {
    console.log("inizio showSpaggiari()");
    var url = 'https://web.spaggiari.eu';
    var demo_area = document.createElement("textarea");
    demo_area.setAttribute("id", "demo");
    demo_area.setAttribute("rows", 20);
    demo_area.setAttribute("cols", 50);
    document.body.appendChild(demo_area);
    document.getElementById("demo").value = "";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange =
        function() {
            if (xhr.readyState == 4)
                document.getElementById("demo").value = xhr.responseText;
        };
    xhr.send();
    console.log("fine showSpaggiari()");
}

/*
@param String student
@param String annotation
@return mette una nota per linguaggio scurrile allo studente
*/
function setAnnotation(student, annotation) {
    console.log("inizio setAnnotation("+student+","+annotation+")");
    var url = 'https://web.spaggiari.eu';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange =
        function() {
            if (xhr.readyState == 4) {
                // codice da inserire
            }
        };
    xhr.send();
    console.log("fine setAnnotation("+student+","+annotation+")");
}

/*
@param String line
*/
function interpret(line) {
    console.log("inizio interpret("+line+")");
    const list = line.split(" ");
    const i = indexOfCommand(list[0]);
    let student;
    switch (i){
        case Commands.NOTA:
            student = list[1];
            setAnnotation(student, "Usa linguaggio scurrile in classe.");
            break;
        case Commands.FOTO:
            student = list[1];
            showPicture(student);
            break;
        case Commands.SPAGGIARI:
            showSpaggiari();
            break;
        case Commands.AVVERTIMENTO:
            student = list[1];
            warn(student);
            break;
        case Commands.NONE:
            console.log("Comando non trovato.");
            break;
    }
    console.log("fine interpret("+line+")");
}