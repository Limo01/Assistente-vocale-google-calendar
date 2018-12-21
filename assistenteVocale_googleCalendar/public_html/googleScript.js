// Client ID and API key from the Developer Console
var CLIENT_ID = '472145520140-1esku2jps3kvn6s7aq8rootb7nocijt3.apps.googleusercontent.com';
var API_KEY = 'AIzaSyB_zTXxQb4Jt_kuPTNidscf2QDF-QRMsWg';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

//var authorizeButton = document.getElementById('authorize_button');
var authorizeButton = document.getElementById('loginButton');
//authorizeButton.onclick = handleAuthClick;
var signoutButton = document.getElementById('logOutButton');
//signoutButton.onclick= handleSignoutClick;
//var signoutButton = document.getElementById('signout_button');

var calendari= undefined;//array che contiene le informazioni per ogni calendario

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendResponse(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        
        //animazione login
        var t = jQuery(document.getElementById("header"));
        t.toggleClass('hide');
        document.getElementById('pagina').style.display = 'block';
        
        getCalendarsList();
    } 
    else
    {
        authorizeButton.style.display = 'block';
        document.getElementById('pagina').style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    window.location.replace("https://limo01.github.io/assistenteVocale_googleCalendar/public_html/");
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendResponse(message) {
    document.getElementById("responseButton").style.display= "none";
    var pre = document.getElementById('responseSpan');
    //var textContent = document.createTextNode(message + '\n');
    pre.innerHTML= message;
    pre.style.display="block";
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;
        
        var stringEvent="";
        
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                    stringEvent+= event.summary + ' (' + when + ')' + '<br>';
                }
                else
                {
                    stringEvent+= event.summary + ' (' + when.substring(0, 10) + ' ore ' + when.substring(11, 17) + ')' + '<br>';
                }
                appendResponse('Upcoming events:'+'<br>'+stringEvent);
            }
        } else {
            appendResponse('No upcoming events found.');
            window.avatar.say("Non hai eventi nel tuo calendario.");
        }
    });
}


function addEventToCalendar(data, ora, evento)
{
    var event = {
        "start": {
            "dateTime": data+"T"+ora+":00",
            "timeZone": "Europe/Rome"
        },
        "end": {
            "dateTime": data+"T"+ora+":00",
            "timeZone": "Europe/Rome"
        },
        "summary": evento
    };

    var request = gapi.client.calendar.events.insert({
        'calendarId': "primary",
        'resource': event
    });

    request.execute(function (event) {
        if(event.htmlLink!==undefined)
        {
            document.getElementById("responseSpan").style.display= "none";
            var button= document.getElementById("responseButton");
            button.onclick= function(){window.location.href= event.htmlLink;};
            button.style.display="block";
            window.avatar.say("Ho aggiunto il tuo evento al calendario. Clicca il bottone per visualizzarlo.");
        }
        else
        {
            window.avatar.say("Sintassi del comando errata");
        }
    });
}

function getCalendarsList()
{
    gapi.client.calendar.calendarList.list({}
    ).then(function (response) {
        var calendars = response.result.items;
        console.log(calendars);
        
        for(var i=0; i<calendars.length; i++)
        {
            calendari[calendars[i].summary]= {"id":calendars[i].id, "accessRole":calendars[i].accessRole};
        }
        console.log(calendari);
    });
}