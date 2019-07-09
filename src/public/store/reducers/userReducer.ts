import { UserPayload, UserAction } from '../actions/userAction';

// init
export const initialState: UserPayload = {
};

// reducer
export const userReducer = (state = initialState, action: UserAction): UserPayload => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USERS':
      return { ...state, users: payload.users };
    case 'SET_USER': {
      return { ...state, user: payload.user };
    }
  }

  return state;
};
