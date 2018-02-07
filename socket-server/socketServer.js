var io = require('socket.io')();

var plans = [];

io.on('connection', (client) => {
  console.log('new connected');
  client.on('client', (data) => {
    console.log('new message', data);
    let sendData = {
      type: 'message',
      data: data
    }
    plans.push(data);
    client.emit('message', sendData);
    client.broadcast.emit('message', sendData);
  })
  client.on('activity', (data) => {
    console.log('new activity', data);
    let sendData = {
      type: 'activity',
      data: data
    }
    // client.emit('message', sendData);
    client.broadcast.emit('message', sendData);
  })
  client.on('comment', (data) => {
    console.log('new comment', data);
    let sendData = {
      type: 'comment',
      data: data
    }
    client.broadcast.emit('message', sendData);
  })
  client.on('deleteActivity', (data) => {
    console.log('delect activity', data);
    let sendData = {
      type: 'deleteActivity',
      data: data
    }
    client.broadcast.emit('message', sendData);
  })
  client.on('invite', (data) => {
    console.log('invite', data);
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
