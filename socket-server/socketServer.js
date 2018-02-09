const io = require('socket.io')();
const plans = [];

io.on('connection', (client) => {
  client.on('client', (data) => {
    let sendData = {
      type: 'message',
      data: data
    }
    plans.push(data);
    client.emit('message', sendData);
    client.broadcast.emit('message', sendData);
  })
  client.on('activity', (data) => {
    let sendData = {
      type: 'activity',
      data: data
    }
    client.broadcast.emit('message', sendData);
  })
  client.on('comment', (data) => {
    let sendData = {
      type: 'comment',
      data: data
    }
    client.broadcast.emit('message', sendData);
  })
  client.on('deleteActivity', (data) => {
    let sendData = {
      type: 'deleteActivity',
      data: data
    }
    client.broadcast.emit('message', sendData);
  })
  client.on('invite', (data) => {
    let sendData = {
      type: 'invite',
      data: data
    }
    client.broadcast.emit('message', sendData);
  })
});


const port = 8090;
io.listen(port);
console.log('socket listening on port', port);
