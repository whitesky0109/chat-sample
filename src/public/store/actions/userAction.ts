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

export const onRecvLogin = (user?: string): UserAction => ({
  type: USER_ACTION_TYPES.SET_USER,
  payload: {
    user,
  },
});

export const onRecvUsers = (users?: IUser): UserAction => ({
  type: USER_ACTION_TYPES.SET_USERS,
  payload: {
    users,
  },
});

export const onRecvLogout = () => onRecvLogin();
