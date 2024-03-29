import { RoomPayload, RoomAction, ROOM_ACTION_TYPES } from 'public/store/actions/roomAction';

// init
export const initialState: RoomPayload = {
  room: {},
  messages: [],
};

// reducer
export const roomReducer = (state = initialState, action?: RoomAction): RoomPayload => {
  if (!action) {
    return state;
  }
  const { payload } = action;

  switch (action.type) {
    case ROOM_ACTION_TYPES.SET_ROOMS:
      return { ...state, room: { ...payload.room } };
    case ROOM_ACTION_TYPES.SET_ROOM:
      return { ...state, roomId: payload.roomId };
    case ROOM_ACTION_TYPES.ADD_MESSAGE:
      const { messages } = state;
      const msgs = messages ? messages : [];
      const { message } = payload;

      if (message) {
        return { ...state, messages: [...msgs, message] };
      }
    case ROOM_ACTION_TYPES.CLEAR_MESSAGE:
      return { ...state, messages: [] };
  }

  return state;
};
