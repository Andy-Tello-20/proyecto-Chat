import { Server } from 'socket.io';

let io;

const conversation = [
  {
    username: '🤖',
    body: 'Hola este es un msj automatico.',
  },
];

export const init = (httpServer) => {
  io = new Server(httpServer);

  io.on('connection', (socketClient) => {
    
    socketClient.emit('update-conversation', conversation);
    
    socketClient.on('new-message', (newMessage) => {
      conversation.push(newMessage);
      io.emit('update-conversation', conversation);
    });

  });
};

export const newMessageFromAPI = (newMessage) => {
  conversation.push(newMessage);
  io.emit('update-conversation', conversation);
}