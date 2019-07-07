import { createHashHistory } from 'history';
import io from 'socket.io-client';

export const history = createHashHistory();

export const socket: SocketIOClient.Socket = io('/chat');
