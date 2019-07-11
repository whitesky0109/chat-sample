import { userReducer } from './userReducer';
import { onRecvLogin, onRecvLogout, onRecvUsers } from '../actions/userAction';
import { IUser } from 'models/server';

describe('사용자 리듀서', () => {
  let state = userReducer(undefined);

  it('사용자 관리 초기 값이 설정되어야 한다.', () => {
    expect(state).toMatchObject({});
  });

  it('사용자 id 변경이 설정되어야 한다. - 1', () => {
    const userId = 'userid';
    state = userReducer(state, onRecvLogin(userId));

    expect(state).toHaveProperty('user', userId);
  });

  it('사용자 id 변경이 설정되어야 한다. - 2', () => {
    state = userReducer(state, onRecvLogout());

    expect(state.user).toBeUndefined();
  });

  const users: IUser = {
    ['userid']: 'socktid',
  };

  it('모든 유저 정보 변경이 설정되어야 한다 - 1', () => {
    state = userReducer(state, onRecvUsers(users));

    expect(state.users).not.toBeNull();
    expect(state.users).not.toBeUndefined();
    expect(state.users).toMatchObject(users);
  });

  it('모든 유저 정보 변경이 설정되어야 한다 - 2', () => {
    state = userReducer(state, onRecvUsers());

    expect(state.users).toBeUndefined();
  });
});
