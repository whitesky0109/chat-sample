import { roomReducer } from './roomReducer';
import { IRoom, IMessage as IServerMessage } from 'models/server';
import { onRecvRoom, setRoomId, addMessage, clearMessage } from '../actions/roomAction';

describe('채팅방 리듀서', () => {
  let state = roomReducer(undefined);

  describe('채팅방 설정 관리', () => {

    it('초기 값이 설정 되어야 한다.', () => {
      expect(state.room).not.toBeNull();
      expect(state.room).not.toBeUndefined();
      expect(state.room).toMatchObject({});
    });

    it('변경 된 채팅방 목록이 설정되어야 한다1', () => {
      const room: IRoom = {
        ['id1']: {
          creator: 'user1',
          name: 'username',
          users: {},
        },
      };
      state = roomReducer(state, onRecvRoom(room));
      expect(state.room).toMatchObject(room);
    });

    it('변경 된 채팅방 목록이 설정되어야 한다2', () => {
      const room: IRoom = {};
      state = roomReducer(state, onRecvRoom(room));
      expect(state.room).not.toBeNull();
      expect(state.room).not.toBeUndefined();
      expect(state.room).toMatchObject(room);
    });

    it('들어갈 채팅방이 설정되어야 한다.', () => {
      const roomId = 'roomid1';
      state = roomReducer(state, setRoomId(roomId));
      expect(state).toHaveProperty('roomId', roomId);
    });

    it('나간 채팅방이 설정되어야 한다.', () => {
      state = roomReducer(state, setRoomId());
      expect(state.roomId).toBeUndefined();
    });
  });

  describe('채팅방 메세지 관리', () => {
    const recvTextMessage: IServerMessage = {
      date: new Date(),
      isMy: true,
      message: 'recv message',
      type: 'text',
      userId: 'userid',
    };
    const recvImageMessage: IServerMessage = {
      date: new Date(),
      isMy: true,
      message: new ArrayBuffer(10),
      type: 'image/png',
      userId: 'userid',
    };

    it('텍스트 메세지는 내용이 보관할 수 있어야 한다.', () => {
      state = roomReducer(state, addMessage(recvTextMessage));
      expect(state.messages).toHaveLength(1);
    });

    it('이미지 메세지는 내용이 보관할 수 있어야 한다.', () => {
      state = roomReducer(state, addMessage(recvImageMessage));
      expect(state.messages).toHaveLength(2);
    });

    it('모든 메세지를 삭제할 수 있어야 한다.', () => {
      state = roomReducer(state, clearMessage());
      expect(state.messages).toHaveLength(0);
    });
  });
});
