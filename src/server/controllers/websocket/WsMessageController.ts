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
  }

  @OnDisconnect()
  disconnect(@ConnectedSocket() socket: SocketIO.Socket) {
    const { id } = socket;
    const uid = this.userSrv.getUserIdBySockId(id);

    if (uid) {
      this.roomSrv.logoutRoom(uid);
      this.userSrv.removeUser(uid);
      this.sockMgrSrv.emitAll('users', this.userSrv.getUsers());
    }
    this.sockMgrSrv.delSocket(id);
  }

  @OnMessage('login')
  addUser(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: any) {
    const { name } = message;

    const isAdded = this.userSrv.addUser(name, socket.id);
    if (isAdded) {
      this.sockMgrSrv.emitAll('users', this.userSrv.getUsers());
    }

    socket.emit('login', isAdded ? name : null);

    socket.emit('room', this.roomSrv.getRooms(name));
  }

  @OnMessage('room')
  getRoom(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() req: any) {
    const uid = this.userSrv.getUserIdBySockId(socket.id);

    if (uid) {
      const result = req
        ? this.roomSrv.getRoom(req.id)
        : this.roomSrv.getRooms(uid);

      socket.emit('room', result);
    } else {
      socket.emit('room', null);
    }
  }

  @OnMessage('room/new')
  addRoom(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: any) {
    const rid = uid();
    let userId = this.userSrv.getUserIdBySockId(socket.id);
    userId = userId ? userId : 'Unknown';

    this.roomSrv.addRoom(rid, message.name, userId);

    socket.emit('room', this.roomSrv.getRooms(userId));
  }

  @OnMessage('room/in')
  enterRoom(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: any) {
    const userId = this.userSrv.getUserIdBySockId(socket.id);
    if (!userId || !message) {
      this.loggerSrv.info('user not found');
      return;
    }

    const roomId = message.id;
    this.roomSrv.loginUser(roomId, userId);

    socket.emit('room/in', roomId);
  }

  @OnMessage('room/out')
  leaveRoom(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: any) {
    const userId = this.userSrv.getUserIdBySockId(socket.id);
    if (!userId || !message) {
      this.loggerSrv.info('user not found');
      return;
    }

    const roomId = message.id;
    this.roomSrv.logoutUser(roomId, userId);

    socket.emit('room/out', roomId);
  }

  @OnMessage('room/message')
  roomMessage(@ConnectedSocket() socket: SocketIO.Socket,
              @MessageBody() data: any,
  ) {
    const { roomId, type, message } = data;
    const room = this.roomSrv.getRoom(roomId);
    const uid = this.userSrv.getUserIdBySockId(socket.id);

    if (room) {
      for (const userId in room.users) {
        const sockId = room.users[userId];
        if (sockId) {
          const msg: IMessage = {
            type,
            message,
            userId: uid ? uid : 'unknown',
            isMy: (sockId === socket.id) ? true : false,
            date: new Date(),
          };

          this.sockMgrSrv
            .getSocket(sockId)
            .emit('room/message', msg);
        }
      }
    }
  }

  @OnMessage('room/invite')
  inviteUser(@MessageBody() invite: IInvite,
  ) {
    const allUser = this.userSrv.getUsers();
    const { roomId, users: inviteUsers } = invite;
    const room = this.roomSrv.getRoom(roomId);

    if (!room) {
      return;
    }
    this.roomSrv.loginUsers(roomId, inviteUsers);

    for (const userId in room.users) {
      const sockId = allUser[userId];

      if (sockId) {
        this.sockMgrSrv
          .getSocket(sockId)
          .emit('room', this.roomSrv.getRooms(userId));
      }
    }
  }

  @OnMessage('users')
  getUsers(@ConnectedSocket() socket: SocketIO.Socket) {
    const uid = this.userSrv.getUserIdBySockId(socket.id);

    const message = uid ? this.userSrv.getUsers() : null;

    socket.emit('users', message);
  }
}
