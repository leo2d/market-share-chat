import SocketIO from 'socket.io';
import * as MessageBuilder from '../messages/messageBuilder';
import * as CommandUtils from '../../utils/commandUtils';

export default class SocketManager {
  private static getDefaultRoom() {
    return {
      id: '304134d3-a8dc-451f-857f-bd44c89e1ed4',
      name: 'market-room',
    };
  }

  private static onJoin(socket: SocketIO.Socket, user: any, room: any): void {
    const defaultRoom = this.getDefaultRoom();

    socket.join(defaultRoom.id);
    socket.emit('message', {
      message: MessageBuilder.buildWelcomeMessage(user.username),
    });

    socket.broadcast.to(defaultRoom.id).emit('message', {
      message: MessageBuilder.buildNewUserJoinedMsg(user.username),
    });
  }

  private static onDisconnect(socket: SocketIO.Socket) {
    console.log(`Client ${socket.id} has disconnected`);
  }

  private static onMessage(
    socketIO: SocketIO.Server,
    socket: SocketIO.Socket,
    message: any
  ): void {
    const defaultRoom = this.getDefaultRoom();

    console.log(
      `Received message from client: ${socket.id} user: ${message.author}`
    );
    socketIO.to(defaultRoom.id).emit('message', { message });
  }

  private static onCommand(
    socketIO: SocketIO.Server,
    socket: SocketIO.Socket,
    message: any
  ): void {
    const defaultRoom = this.getDefaultRoom();

    console.log(
      `Received command ${message.text} from client: ${socket.id} user: ${message.author}`
    );

    const commandKey = CommandUtils.getCommand(message.text);
    const sotckCode = CommandUtils.getStockCode(message.text);

    const commandISValid =
      commandKey && CommandUtils.isAValidCommand(commandKey);

    if (commandISValid && sotckCode) {
      //call the bot endpoint
      console.log('ok is valid');
      const responseMessage = MessageBuilder.buildReceivedValidCommandMsg(
        sotckCode
      );
      socketIO.to(defaultRoom.id).emit('command', { message: responseMessage });
    } else {
      const responseMessage = !commandISValid
        ? MessageBuilder.buildInvalidCommandMsg(message.text)
        : MessageBuilder.buildInvalidStockCodeMsg(message.text);

      socket.emit('message', { message: responseMessage });
    }
  }

  public static manageServerEvents(socketIO: SocketIO.Server): void {
    socketIO.on('connection', (socket: SocketIO.Socket) => {
      console.log(`Client ${socket.id}  connected`);

      socket.on('join', ({ user, room }) => {
        this.onJoin(socket, user, room);
      });

      socket.on('message', message => {
        this.onMessage(socketIO, socket, message);
      });

      socket.on('command', message => {
        this.onCommand(socketIO, socket, message);
      });

      socket.on('disconnect', event => {
        this.onDisconnect(socket);
      });
    });
  }
}
