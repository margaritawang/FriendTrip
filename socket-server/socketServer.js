var io = require('socket.io')();

var plans = [];

io.on('connection', (client) => {
  console.log('connected');
  client.on('client', (data) => {
    console.log('new message', data);
    plans.push(data);
    client.emit('message', data);
    client.broadcast.emit('message', data);
  })
});


const port = 8090;
io.listen(port);
console.log('socket listening on port', port);
