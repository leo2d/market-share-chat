import SocketIO from 'socket.io';
import * as MessageBuilder from '../../presentation/messages/messageBuilder';
import * as CommandUtils from '../../utils/commandUtils';
import BotService from '../http/botService';
import QuoteRequestDTO from '../http/quoteRequestDTO';
import Room from '../../domain/chat/entities/room';
import ProccessMessageDTO from '../queue/proccessMessageDTO';

export default class SocketManager {
  private readonly botService: BotService;
  private readonly socketIOServer: SocketIO.Server;

  private readonly defaultRoom: Room;

  constructor(socketIOServer: SocketIO.Server, botService: BotService) {
    this.socketIOServer = socketIOServer;
    this.botService = botService;

    //solve this hard code by creating a multiroom feature and store in DB
    this.defaultRoom = this.defaultRoom = new Room();
    this.defaultRoom.id = '304134d3-a8dc-451f-857f-bd44c89e1ed4';
    this.defaultRoom.name = 'market-room';
  }

  private onJoin(socket: SocketIO.Socket, user: any, room: any): void {
    socket.join(this.defaultRoom.id);
    socket.emit('message', {
      message: MessageBuilder.buildWelcomeMessage(user.username),
    });

    socket.broadcast.to(this.defaultRoom.id).emit('message', {
      message: MessageBuilder.buildNewUserJoinedMsg(user.username),
    });
  }

  private onDisconnect(socket: SocketIO.Socket) {
    console.log(`Client ${socket.id} has disconnected`);

    socket.broadcast.to(this.defaultRoom.id).emit('message', {
      message: MessageBuilder.buildUserLeftMsg('someone'),
    });
  }

  private onMessage(socket: SocketIO.Socket, message: any): void {
    console.log(
      `Received message from client: ${socket.id} user: ${message.author}`
    );
    this.socketIOServer.to(this.defaultRoom.id).emit('message', { message });
  }

  private async onCommand(
    socket: SocketIO.Socket,
    message: any
  ): Promise<void> {
    console.log(
      `Received command ${message.text} from client: ${socket.id} user: ${message.author}`
    );

    const commandKey = CommandUtils.getCommand(message.text);
    const stockCode = CommandUtils.getStockCode(message.text);

    const commandISValid =
      commandKey && CommandUtils.isAValidCommand(commandKey);

    if (commandISValid && stockCode) {
      const quoteRequest: QuoteRequestDTO = {
        roomId: this.defaultRoom.id,
        stockCode,
      };

      const success = await this.botService.sendToBot(quoteRequest);

      const responseMessage = success
        ? MessageBuilder.buildReceivedValidCommandMsg(stockCode)
        : MessageBuilder.buildCanNotProccessMsg(stockCode);

      this.socketIOServer
        .to(this.defaultRoom.id)
        .emit('command', { message: responseMessage });
    } else {
      const responseMessage = !commandISValid
        ? MessageBuilder.buildInvalidCommandMsg(message.text)
        : MessageBuilder.buildInvalidStockCodeMsg(message.text);

      socket.emit('command', { message: responseMessage });
    }
  }

  public manageServerEvents(): void {
    this.socketIOServer.on('connection', (socket: SocketIO.Socket) => {
      console.log(`Client ${socket.id}  connected`);

      socket.on('join', ({ user, room }) => {
        this.onJoin(socket, user, room);
      });

      socket.on('message', message => {
        this.onMessage(socket, message);
      });

      socket.on('command', message => {
        this.onCommand(socket, message);
      });

      socket.on('disconnect', event => {
        this.onDisconnect(socket);
      });
    });
  }

  public onReceiveMessageFromBroker(brokerMessage: ProccessMessageDTO): void {
    const message = brokerMessage.success
      ? MessageBuilder.buildProccessSuccessMsg(
          brokerMessage.requestedStock,
          brokerMessage.quote
        )
      : MessageBuilder.buildProccessErrorMsg(brokerMessage.requestedStock);

    this.socketIOServer.to(brokerMessage.roomId).emit('command', { message });
  }
}
