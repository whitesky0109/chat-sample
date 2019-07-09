import io from 'socket.io-client';

// models
import { IMessage } from 'models/client';
import { IInvite, IUser, IRoom, IMessage as IServerMessage } from 'models/server';

// redux
import { onRecvLogin, onRecvUsers, onRecvLogout } from 'public/store/actions/userAction';
import { addMessage, onRecvRoom, setRoomId } from 'public/store/actions/roomAction';
import { clearAll } from 'public/store';

export const socket: SocketIOClient.Socket = io('/chat');

socket.on('connect', () => {
  clearAll();
  console.log('socket.io connected');
});

socket.on('disconnect', () => {
  clearAll();
});

socket.on('login', (user: string) => {
  onRecvLogin(user);
});

socket.on('logout', () => {
  onRecvLogout();
});

socket.on('room', (room: IRoom) => {
  onRecvRoom(room);
});

socket.on('room/in', (roomId: string) => {
  setRoomId(roomId);
});

socket.on('room/out', (roomId: string) => {
  setRoomId();
});

socket.on('room/message', (msg: IServerMessage) => {
  addMessage(msg);
});

socket.on('users', (users: IUser) => {
  onRecvUsers(users);
});

export const reqUserLogin = (name: string) => {
  if (!socket.connected) {
    return false;
  }
  socket.emit('login', { name });
  return true;
};

export const reqUserLogout = () => {
  socket.emit('logout');
};

export const reqRooms = (roomId?: string) => {
  if (!socket.connected) {
    return false;
  }

  socket.emit('room', roomId ? { id: roomId } : undefined);
  return true;
};

export const reqUsers = () => {
  if (!socket.connected) {
    return false;
  }

  socket.emit('users');
  return true;
};

export const reqAddRoom = (name: string) => {
  if (!socket.connected) {
    return false;
  }
  socket.emit('room/new', { name });
  return true;
};

export const reqEnterRoom = (id: string) => {
  if (!socket.connected) {
    return false;
  }
  socket.emit('room/in', { id });
  return true;
};

export const reqLeaveRoom = (id: string) => {
  if (!socket.connected) {
    return false;
  }
  socket.emit('room/out', { id });
  return true;
};

export const reqSendMessage = (msg: IMessage) => {
  if (!socket.connected) {
    return false;
  }
  socket.emit('room/message', msg);
  return true;
};

export const reqInvite = (msg: IInvite) => {
  if (!socket.connected) {
    return false;
  }
  socket.emit('room/invite', msg);
  return true;
};

export const logout = () => {
  socket.disconnect();
};

export default socket;
