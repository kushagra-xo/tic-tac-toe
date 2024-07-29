const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 4000 });

let clients = [];

server.on('connection', (socket) => {
    clients.push(socket);
    console.log('New client connected!');
    
    socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
        
    clients.forEach(client => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    })
    
    socket.on('close', () => {
        clients = clients.filter(client => client !== socket); // Remove a friend from the list when they leave
        console.log('Client disconnected');
      });
})