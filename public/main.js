var pictionary = function() {
    var canvas, context; // short hand for declaring variables
    var socket = io(); // global variable, on line 20 then you can 
    var drawing = false;
    var draw = function(position) { //Draw function! 
        context.beginPath(); //this tells that you are about to start drawing a new object
        context.arc(position.x, position.y, // used to draw arcs
                         6, 0, 2 * Math.PI);
        context.fill(); //fills the path in to create a solid black cirlce
    };

    canvas = $('canvas');  // use jQuery to select the canvas element
    context = canvas[0].getContext('2d'); //  function to create a drawing context for the canvas /    context object allows you to draw simple graphics to the canvas
    canvas[0].width = canvas[0].offsetWidth; //width and height are equal
    canvas[0].height = canvas[0].offsetHeight; //width and height are equal
    canvas.on('mousemove', function(event) { // mousemove listener
        if(drawing){ // if this is true

            var offset = canvas.offset();
            var position = {x: event.pageX - offset.left,
                            y: event.pageY - offset.top}; //by subtracting the offset we obtain the position of the mouse relative to the top-left of the canvas
            draw(position); // call the draw function; DRAWS FOR ME
            socket.emit('draw', position); //LOCAL /event and parameter ; let serve know I'm drawing                  
        }
    });

    canvas.on('mousedown', function(event){
        drawing = true;

    });

    canvas.on('mouseup', function(event){
        drawing = false;
    });

    socket.on('draw', function(position){ // responds to server whnever someone draws
        draw(position); //draws for everyone ELSE!!!!
    });

    socket.on('guess', function(position){ //
        $("#guessMade").text(); 
    });

    // Guessing Section
    var guessBox;

    var onKeyDown = function(event) {
        if (event.keyCode != 13) { // Enter
            return;
        }

        console.log(guessBox.val());
        guessBox.val('');
    };

    guessBox = $('#guess input'); //When there is a keydown event fired by the input you check to see whether the enter key was pressed. If it was pressed, then you log the value to the console and reset the input to be empty.
    guessBox.on('keydown', onKeyDown);    



};

$(document).ready(function() {
    
    pictionary();
});

//Comments







