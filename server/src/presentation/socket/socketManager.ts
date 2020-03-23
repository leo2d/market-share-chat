import SocketIO from 'socket.io';
import MessageBase from '../messages/messageBase';

export default class SocketManager {
  public static manageServerEvents(socketIO: SocketIO.Server): void {
    const defaultRoom = 'market-room';

    socketIO.on('connection', socket => {
      console.log(`Client ${socket.id}  connected`);

      socket.on('join', ({ user, room }) => {
        const welcomeMsg = new MessageBase({
          id: `${Math.random()}`,
          author: 'ADMIN',
          text: `Welcome, ${user.username}!`,
          sentAt: new Date(),
        });

        const newUserJoinedMsg = new MessageBase({
          id: `${Math.random()}`,
          author: 'ADMIN',
          text: `${user.username} has joined!`,
          sentAt: new Date(),
        });

        socket.join(room);
        socket.emit('message', { message: welcomeMsg });

        socket.broadcast
          .to(room)
          .emit('message', { message: newUserJoinedMsg });
      });

      socket.on('message', message => {
        console.log(
          `Received message from client: ${socket.id} user: ${message.author}`
        );
        socketIO.to(defaultRoom).emit('message', { message });
      });

      socket.on('disconnect', event =>
        console.log(`Client ${socket.id} has disconnected`)
      );
    });
  }
}
