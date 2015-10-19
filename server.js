var express = require('express');
var app = express();

app.use(express.static('public'));
var server = app.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
var io = require('socket.io')(server);
var numeroM=0;

io.on('connection', function(socket)
{
  socket.on("login",function(name)
                     {
                        socket.name=name;
                        numeroM++;
                        console.log('The user: ' + name+" is now logged!");
                        console.log(numeroM+" usuarios logados!");
                        io.emit('chat message', name+" logado!");
                     });

  socket.on('chat message', function(msg)
  {
    console.log(socket.name+': ' + msg);
    io.emit('chat message',socket.name+': '+msg);
  });
  socket.on('disconnect', function ()
  {
      if(numeroM>0)
      {
        numeroM--;
      }
       console.log(socket.name+': '+' se desconectou!');
       io.emit('chat message',socket.name+': '+' se desconectou!');
  });
});