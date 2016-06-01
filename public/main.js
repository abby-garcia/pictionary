var pictionary = function() {
    var canvas, context;

    var draw = function(position) { //Draw function! 
        context.beginPath(); //this tells that you are about to start drawing a new object
        context.arc(position.x, position.y, // used to draw arc
                         6, 0, 2 * Math.PI);
        context.fill();
    };

    canvas = $('canvas');  // use jQuery to select the canvas element
    context = canvas[0].getContext('2d'); //  function to create a drawing context for the canvas /    context object allows you to draw simple graphics to the canvas
    canvas[0].width = canvas[0].offsetWidth; //width and height are equal
    canvas[0].height = canvas[0].offsetHeight; //width and height are equal
    canvas.on('mousemove', function(event) { // mousemove listener
        var offset = canvas.offset();
        var position = {x: event.pageX - offset.left,
                        y: event.pageY - offset.top}; //by subtracting the offset we obtain the position of the mouse relative to the top-left of the canvas
        draw(position);
    });
};

$(document).ready(function() {
    pictionary();
});



