import { IRoom, IMessage } from 'models/server';

export enum ROOM_ACTION_TYPES {
  SET_ROOMS = 'SET_ROOMS',
  SET_ROOM = 'SET_ROOM',
  ADD_MESSAGE = 'ADD_MESSAGE',
  CLEAR_MESSAGE = 'CLEAR_MESSAGE',
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

export const onRecvRoom = (room?: IRoom): RoomAction => ({
  type: ROOM_ACTION_TYPES.SET_ROOMS,
  payload: {
    room,
  },
});

export const setRoomId = (roomId?: string): RoomAction => ({
  type: ROOM_ACTION_TYPES.SET_ROOM,
  payload: {
    roomId,
  },
});

export const addMessage = (message: IMessage): RoomAction => ({
  type: ROOM_ACTION_TYPES.ADD_MESSAGE,
  payload: {
    message,
  },
});

export const clearMessage = (): RoomAction => ({
  type: ROOM_ACTION_TYPES.CLEAR_MESSAGE,
  payload: {},
});
