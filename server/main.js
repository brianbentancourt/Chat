var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mensajes = [{
  text: "Mensaje enviado desde el servidor",
  author: "Brian"
}];

app.use(express.static('public'));

app.get('/hello', function(req, res){
  res.status(200).send("Hola mundo!");
});

io.on('connection', function(socket){
  console.log('Alguien se ha conectado con sockets');
  socket.emit('messages', mensajes);

  socket.on('new-message', function(data){
    mensajes.push(data);
    io.sockets.emit("messages", mensajes);
  });

});

server.listen(3002, function(){
  console.log("Servidor corriendo en http://localhost:3002")
});
