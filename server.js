var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);


var numUsers = 0;

//then create a counter

io.on('connection', function (socket) {
	var drawer = false; 
	numUsers++; // on connect we increase one

	if(numUsers == 1){
		drawer = true;
	}
	socket.emit('new connection', drawer); // here we're passing on drawer to the front end

	socket.on('draw', function(position){ //tell every I started drawing
		socket.broadcast.emit('draw', position);  //emit to other clients
	});

	socket.on('guess', function(guess){ //where is 'guess' on the main.js side?
		socket.broadcast.emit('guess', guess);  // is position right?
	});

	socket.on('word', function(word){ //socket.on should set word to a global so that the server has that in memory


	});

	socket.on('match', function(gameOver){
		socket.broadcast.emit('match', gameOver);
	});



});




server.listen(8080);