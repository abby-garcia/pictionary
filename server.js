var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);


io.on('connection', function (socket) {


	socket.on('draw', function(position){ //tell every I started drawing
		socket.broadcast.emit('draw', position);  //emit to other clients
	});

	socket.on('guess', function(guessBox){ //where is 'guess' on the main.js side?
		socket.broadcast.emit('guess', position);  // is position right?
	});



});




server.listen(8080);