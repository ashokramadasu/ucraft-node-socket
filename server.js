const express     = require('express'),
      app         = express(),
      server      = require('http').createServer(app),
      io          = require('socket.io').listen(server),
      port        = process.env.PORT || 3000,
      users       = [],
      connections = [];

// Express server listening at port      
server.listen(port);
console.log('Express server listening at ' + port);

// home page Route
app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
});

// Socket connection and Message publishing through Events
io.sockets.on('connection', function(socket) {
      connections.push(socket);
      console.log('Connected: %s sockets connected', connections.length);

      // Disconnect
      socket.on('disconnect', function(data){
            if(!socket.username) return;
            users.splice(users.indexOf(socket.username), 1);
            connections.splice(connections.indexOf(socket), 1);
            console.log('Disconnected: %s sockets connected', connections.length);
      });
      
      // Publish message
      socket.on('publishMessage', function(data){
            io.sockets.emit('message', { msg: data, user: socket.username});
      });

      // New User addition
      socket.on('newUser', function(data, callback){
            callback(true);
            socket.username = data;
            users.push(socket.username);
            updateUsernames();
      });
      // function to updateUsernames
      function updateUsernames(){
            io.sockets.emit('getUsers', users);   
      }
});