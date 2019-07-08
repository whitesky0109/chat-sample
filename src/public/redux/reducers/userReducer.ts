import { UserPayload, UserAction, USER_ACTION_TYPES } from '../actions/userAction';

// init
export const initialState: UserPayload = {
};

// reducer
export const userReducer = (state = initialState, action: UserAction): UserPayload => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_USERS: {
      return { ...state, users: action.payload.users };
    }
    case USER_ACTION_TYPES.SET_USER: {
      return { ...state, user: action.payload.user };
    }
  }

  return state;
};
