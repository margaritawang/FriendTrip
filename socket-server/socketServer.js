var io = require('socket.io')();

var plans = [];

io.on('connection', (client) => {
  console.log('connected');
  client.emit("message", {plan: 'new'});
  client.on('addNewPlan', (plan) => {
    console.log('new plan', plan);
    plans.push(plan);
    client.broadcast.emit('added', plans);
  })
});


const port = 8090;
io.listen(port);
console.log('socket listening on port', port);
