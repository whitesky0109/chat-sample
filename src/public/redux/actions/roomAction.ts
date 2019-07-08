import { IRoom, IMessage } from '../../../models/server';
import store from '../store';

export enum ROOM_ACTION_TYPES {
  SET_ROOMS = 'SET_ROOMS',
  SET_ROOM = 'SET_ROOM',
  ADD_MESSAGE = 'ADD_MESSAGE',
}

export interface RoomPayload {
  room?: IRoom;
  roomId?: string;
  message?: IMessage;
  messages?: IMessage[];
}

export interface RoomAction {
  type: ROOM_ACTION_TYPES;
  payload: RoomPayload;
}

export const setRoomId = (roomId?: string) => {
  const msg: RoomAction = {
    type: ROOM_ACTION_TYPES.SET_ROOM,
    payload: {
      roomId,
    },
  };
  store.dispatch(msg);
};

export const addMessage = (message: IMessage) => {
  const msg: RoomAction = {
    type: ROOM_ACTION_TYPES.ADD_MESSAGE,
    payload: {
      message,
    },
  };
  store.dispatch(msg);
};

export const onRecvRoom = (room?: IRoom) => {
  const msg: RoomAction = {
    type: ROOM_ACTION_TYPES.SET_ROOMS,
    payload: {
      room,
    },
  };
  store.dispatch(msg);
};
