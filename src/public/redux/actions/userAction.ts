import { IUser } from '../../../models/server';
import store from '../store';

export enum USER_ACTION_TYPES {
  SET_USERS = 'SET_USERS',
  SET_USER = 'SET_USER',
}

export interface UserPayload {
  users?: IUser;
  user?: string;
}

export interface UserAction {
  type: USER_ACTION_TYPES;
  payload: UserPayload;
}

export const onRecvLogin = (user?: string) => {
  const msg: UserAction = {
    type: USER_ACTION_TYPES.SET_USER,
    payload: {
      user,
    },
  };
  store.dispatch(msg);
};

export const onRecvUsers = (users?: IUser) => {
  const msg: UserAction = {
    type: USER_ACTION_TYPES.SET_USERS,
    payload: {
      users,
    },
  };
  store.dispatch(msg);
};
