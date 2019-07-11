import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { StoreState } from 'models/client';
import createMockStore from 'redux-mock-store';
import ChatRoom, { Props } from './ChatRoom';
import { Provider } from 'react-redux';

describe('ChatRoom', () => {
  let component: ReactWrapper;
  let chatRoom: ReactWrapper;

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
      <ChatRoom {...props} />
    </Provider>);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('find ChatRoom component', () => {
    chatRoom = component.find('ChatRoom');
    expect(chatRoom).toHaveLength(1);
  });

});
