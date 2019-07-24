function startButton(event) {
    recognition.start();
}

if (!('webkitSpeechRecognition' in window)) {
    //Speech API not supported here…
} else { //Let’s do some cool stuff :)
    var recognition = new webkitSpeechRecognition(); //That is the object that will manage our whole recognition process. 
    recognition.continuous = true;   //Suitable for dictation. 
    recognition.interimResults = true;  //If we want to start receiving results even if they are not final.
    //Define some more additional parameters for the recognition:
    recognition.lang = "en-US"; 
    recognition.maxAlternatives = 1; //Since from our experience, the highest result is really the best...
}

recognition.onstart = function() {
    //Listening (capturing voice from audio input) started.
    //This is a good place to give the user visual feedback about that (i.e. flash a red light, etc.)
};

recognition.onend = function() {
    //Again – give the user feedback that you are not listening anymore. If you wish to achieve continuous recognition – you can write a script to start the recognizer again here.
};

recognition.onresult = function(event) { //the event holds the results
//Yay – we have results! Let’s check if they are defined and if final or not:
    if (typeof(event.results) === 'undefined') { //Something is wrong…
        recognition.stop();
        return;
    }

    for (var i = event.resultIndex; i < event.results.length; ++i) {      
        if (event.results[i].isFinal) { //Final results
            //console.log("final results: " + event.results[i][0].transcript);   //Of course – here is the place to do useful things with the results.
             $( ".media-list" ).append('<li class="left clearfix"><span class="chat-img pull-left">\
                                <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />\
                            </span>\
                            <div class="chat-body clearfix">\
                                <div class="header">\
                                    <strong class="primary-font">USER</strong> <small class="pull-right text-muted">\
                                        <span class="glyphicon glyphicon-time"></span>12 mins ago</small>\
                                    </div>\
                                    <p class="pull-left"><font color="blue">'+event.results[i][0].transcript+'</font></p>\
                                </div>\
                            </li>');
        $(".panel-body").stop().animate({ scrollTop: $(".panel-body")[0].scrollHeight}, 1000);
        console.log($(this).serialize());
        $.ajax({
            type: "POST",
            url: "/ask",
            data: event.results[i][0].transcript,
            contentType: "application/json",
            success: function(response) {
                $('#chatmessage').val('');
                var answer = response.answer.toUpperCase();
                const chatPanel = document.getElementById("chatPanel");
                $(".media-list").append('<li class="right clearfix"><span class="chat-img pull-right">\
                                <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />\
                            </span>\
                            <div class="chat-body clearfix">\
                                <div class="header">\
                                    <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>13 mins ago</small>\
                                    <strong class="pull-right primary-font">ROBOT</strong>\
                                </div>\
                                <p class="pull-right"><font color ="red">'+answer+'</font></p>\
                             </div>\
                        </li>');
                $(".panel-body").stop().animate({ scrollTop: $(".panel-body")[0].scrollHeight}, 1000);
            },
            error: function(error) {
                console.log(error);
            }
        });
        } else {   //i.e. interim...
           //console.log("interim results: " + event.results[i][0].transcript);  
           //You can use these results to give the user near real time experience.
        } 
    } //end for loop
}; 