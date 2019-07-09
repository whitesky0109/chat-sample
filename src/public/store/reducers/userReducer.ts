import { UserPayload, UserAction } from '../actions/userAction';

// init
export const initialState: UserPayload = {
};

// reducer
export const userReducer = (state = initialState, action: UserAction): UserPayload => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload.users };
    case 'SET_USER': {
      return { ...state, user: action.payload.user };
    }
  }

  return state;
};
