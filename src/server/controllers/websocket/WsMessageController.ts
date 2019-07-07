import { OnConnect, SocketController, ConnectedSocket, OnDisconnect, OnMessage, MessageBody } from 'socket-controllers';
import { SocketManagerService, LoggerService, UserService, RoomService } from '../../services';
import { IMessage, IInvite } from '../../../models/server';
const uid = require('uid');

@SocketController('/chat')
export class WsMessageController {

  constructor(private sockMgrSrv: SocketManagerService,
              private userSrv: UserService,
              private roomSrv: RoomService,
              private loggerSrv: LoggerService,
  ) {
    this.loggerSrv.info('created WsMessageController');
  }

  @OnConnect()
  connection(@ConnectedSocket() socket: SocketIO.Socket) {
    this.sockMgrSrv.addSocket(socket);
    this.loggerSrv.info('new socket client connected');

    const user = this.userSrv.getUsernameById(socket.id);
    if (user) {
      socket.emit('room', this.roomSrv.getRooms(socket.id));
    }
  }

  @OnDisconnect()
  disconnect(@ConnectedSocket() socket: SocketIO.Socket) {
    const { id } = socket;

    this.roomSrv.logoutRoom(id);

    this.userSrv.removeUser(id);
    this.sockMgrSrv.emitAll('users', this.userSrv.getUsers());

    this.sockMgrSrv.delSocket(id);
  }

  @OnMessage('login')
  addUser(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: any) {
    const { name } = message;

    const isAdded = this.userSrv.addUser(socket.id, name);
    if (isAdded) {
      this.sockMgrSrv.emitAll('users', this.userSrv.getUsers());
    }

    socket.emit('login', isAdded ? name : null);

    socket.emit('room', this.roomSrv.getRooms(socket.id));
  }

  @OnMessage('room')
  getRoom(@ConnectedSocket() socket: SocketIO.Socket) {
    const username = this.userSrv.getUsernameById(socket.id);

    if (username) {
      socket.emit('room', this.roomSrv.getRooms(socket.id));
    } else {
      socket.emit('room', null);
    }
  }

  @OnMessage('room/new')
  addRoom(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: any) {
    const rid = uid();
    const username = this.userSrv.getUsernameById(socket.id);
    this.roomSrv.addRoom(rid, message.name, username);
    this.roomSrv.loginUser(rid, socket.id);

    socket.emit('room', this.roomSrv.getRooms(socket.id));
  }

  @OnMessage('room/message')
  roomMessage(@ConnectedSocket() socket: SocketIO.Socket,
              @MessageBody() data: any,
  ) {
    const { roomId, type, message } = data;
    const room = this.roomSrv.getRoom(roomId);
    const username = this.userSrv.getUsernameById(socket.id);

    if (room) {
      for (const userId in room.users) {
        const msg: IMessage = {
          username,
          type,
          message,
          isMy: (userId === socket.id) ? true : false,
          date: new Date(),
        };

        this.sockMgrSrv
          .getSocket(userId)
          .emit('room/message', msg);
      }
    }
  }

  @OnMessage('room/invite')
  inviteUser(@MessageBody() invite: IInvite,
  ) {
    const { roomId, users } = invite;
    this.roomSrv.loginUsers(roomId, users);

    for (const userId of users) {
      this.sockMgrSrv
        .getSocket(userId)
        .emit('room', this.roomSrv.getRooms(userId));
    }
  }

  @OnMessage('users')
  getUsers(@ConnectedSocket() socket: SocketIO.Socket) {
    const username = this.userSrv.getUsernameById(socket.id);

    const message = username ? this.userSrv.getUsers() : null;

    socket.emit('users', message);
  }
}
