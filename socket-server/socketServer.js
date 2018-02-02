var io = require('socket.io')();

var plans = [];

io.on('connection', (client) => {
  console.log('connected');
  client.emit("message", {plan: 'new'});
  client.on('client', (plan) => {
    console.log('new message', plan);
    plans.push(plan);
    client.emit('message', 'hiii');
  })
});


const port = 8090;
io.listen(port);
console.log('socket listening on port', port);
