import { OnConnect, SocketController, ConnectedSocket, OnDisconnect } from 'socket-controllers';
import { SocketManagerService, LoggerService } from '../../services';

@SocketController('/ws')
export class WsMessageController {

  constructor(private sockMgrSrv: SocketManagerService,
              private loggerSrv: LoggerService,
    ) {
    this.loggerSrv.info('created WsMessageController');

  }

  @OnConnect()
    connection(@ConnectedSocket() socket: SocketIO.Socket) {
    this.sockMgrSrv.addSocket(socket);
    this.loggerSrv.info('client connected');
  }

  @OnDisconnect()
    disconnect(@ConnectedSocket() socket: SocketIO.Socket) {
    const { id }: { id: string } = socket;

    this.sockMgrSrv.delSocket(id);
  }

    /*
    @OnMessage("save")
    save(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: any) {
        this.logger.info("received message:", message);
        this.logger.info("setting id to the message and sending it back to the client");
        message.id = 1;
        socket.emit("message_saved", message);
    }
    */
}
