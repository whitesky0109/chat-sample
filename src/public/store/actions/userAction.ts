import store from 'public/store';
import { IUser } from 'models/server';

export enum USER_ACTION_TYPES {
  SET_USER = 'SET_USER',
  SET_USERS = 'SET_USERS',
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

export const onRecvLogout = () => {
  onRecvLogin();
};
