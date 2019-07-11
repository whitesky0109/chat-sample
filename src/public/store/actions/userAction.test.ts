import { IUser } from 'models/server';
import { UserAction, USER_ACTION_TYPES, onRecvLogin, onRecvUsers } from './userAction';

describe('사용자 저장소 액션', () => {
  it('액션이 생성되어야 한다.', () => {
    const users: IUser = {
      ['userid1']: 'socketid1',
    };

    const expectedActions: UserAction[] = [{
      type: USER_ACTION_TYPES.SET_USER,
      payload: {
        user: 'userid',
      },
    }, {
      type: USER_ACTION_TYPES.SET_USERS,
      payload: {
        users,
      },
    }];

    const actions = [
      onRecvLogin('userid'),
      onRecvUsers(users),
    ];

    expect(actions).toEqual(expectedActions);
  });
});
