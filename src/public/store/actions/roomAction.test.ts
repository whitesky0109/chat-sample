import { RoomAction, ROOM_ACTION_TYPES, onRecvRoom, setRoomId, addMessage, clearMessage } from './roomAction';
import { IRoom, IMessage } from 'models/server';

describe('채팅방 저장소 액션', () => {
  it('액션이 생성되어야 한다.', () => {
    const room: IRoom = {
      ['id1']: {
        creator: 'user1',
        name: 'username',
        users: {},
      },
    };
    const message: IMessage = {
      date: new Date(),
      isMy: true,
      message: 'message1',
      type: 'string',
      userId: 'userid1',
    };

    const expectedActions: RoomAction[] = [{
      type: ROOM_ACTION_TYPES.SET_ROOMS,
      payload: {
        room,
      },
    }, {
      type: ROOM_ACTION_TYPES.SET_ROOM,
      payload: {
        roomId: 'roomId1',
      },
    }, {
      type: ROOM_ACTION_TYPES.ADD_MESSAGE,
      payload: {
        message,
      },
    }, {
      type: ROOM_ACTION_TYPES.CLEAR_MESSAGE,
      payload: { },
    }];

    const actions = [
      onRecvRoom(room),
      setRoomId('roomId1'),
      addMessage(message),
      clearMessage(),
    ];

    expect(actions).toEqual(expectedActions);
  });
});
