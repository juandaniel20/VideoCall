const express = require('express');
const app = express();
const http = require('http').Server(app); //creamos un servidor http a partir de la libreria express
const io = require('socket.io')(http); //para poder llamarlo desde nuestros html que vamos a crear luego

//routes

app.use(require('./routes/videocalls.routes'));

//ficheros estaticos
app.use(express.static(__dirname + "/public"));

//streaming de video

io.on('connection', (socket) => {
    socket.on('stream', (image) => {
        socket.broadcast.emit('stream', image); //emitir el evento a todos los sockets conectados
    })
})
module.exports = http;