import React from 'react';
import { Provider } from 'react-redux';
import { mount, ReactWrapper } from 'enzyme';
import createMockStore from 'redux-mock-store';

import InviteUser, { Props } from './InviteUser';

import { StoreState } from 'models/client';

describe('InviteUser', () => {
  let component: ReactWrapper;
  let inviteComp: ReactWrapper;
  const mock: any = jest.fn();
  const props: Props = {
    match: mock,
    location: mock,
    history: {
      goBack: mock,
    } as any,
  };

  const generateFakeStore = (initState: StoreState) => {
    const mockStore = createMockStore();
    return mockStore(initState);
  };
  describe('기본 동작', () => {
    it('render', () => {
      const store = generateFakeStore({
        user: {
          user: 'userid',
          users: {
            ['userid']: 'sockid1',
          },
        },
        room: {
          roomId: 'roomid',
          room: {
            ['roomid']: {
              creator: 'userid',
              name: 'roomname',
              users: {
                ['userid']: 'sockid1',
              },
            },
          },
        },
      });
      component = mount(<Provider store={store}>
        <InviteUser {...props} />
      </Provider>);
    });

    it('matches snapshot', () => {
      expect(component).toMatchSnapshot();
    });

    it('find InviteUser component', () => {
      inviteComp = component.find('InviteUser');
      expect(inviteComp).toHaveLength(1);
    });

    it('초대할 대상이 없는 메세지 확인', () => {
      const text = inviteComp.find('.users').text();
      expect(text).toBe('초대할 수 있는 사용자가 없습니다.');
    });

    it('채팅방 이름 확인', () => {
      const text = inviteComp.find('.chat-num-messages').text();
      expect(text).toBe('Room Name : roomname');
    });

    it('취소 버튼 확인', () => {
      inviteComp.find('.btn').simulate('click');
      expect(mock).toHaveBeenCalled();
    });
  });

  describe('사용자 선택', () => {
    it('render', () => {
      const store = generateFakeStore({
        user: {
          user: 'userid',
          users: {
            ['userid']: 'sockid1',
            ['userid2']: null,
            ['userid3']: 'sockid2',
          },
        },
        room: {
          roomId: 'roomid',
          room: {
            ['roomid']: {
              creator: 'userid',
              name: 'roomname',
              users: {
                ['userid']: 'sockid1',
              },
            },
          },
        },
      });
      component = mount(<Provider store={store}>
        <InviteUser {...props} />
      </Provider>);
    });

    it('find InviteUser component', () => {
      inviteComp = component.find('InviteUser');
      expect(inviteComp).toHaveLength(1);
    });

    it('초대 가능 사용자 수 확인', () => {
      const liList = inviteComp.find('li');
      expect(liList.length).toBe(2);
    });

    it('오프라인 사용자 확인', () => {
      const li = inviteComp.find('li').at(0);
      const status = li.find('.fa-circle').prop('className');

      expect(status).not.toBeUndefined();
      if (status) {
        expect(status.split(' ')[2]).toBe('offline');
      }
    });

    it('온라인 사용자 확인', () => {
      const li = inviteComp.find('li').at(1);
      const status = li.find('.fa-circle').prop('className');

      expect(status).not.toBeUndefined();
      if (status) {
        expect(status.split(' ')[2]).toBe('online');
      }
    });

    it('사용자 선택 확인', () => {
      const li = inviteComp.find('li').at(0);
      li.simulate('click');
      expect(mock).toHaveBeenCalled();
    });

  });

});
