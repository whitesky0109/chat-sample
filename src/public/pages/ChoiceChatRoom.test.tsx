import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { StoreState } from 'models/client';
import createMockStore from 'redux-mock-store';
import ChoiceChatRoom, { Props } from './ChoiceChatRoom';
import { Provider } from 'react-redux';

describe('ChoiceChatRoom', () => {
  let component: ReactWrapper;
  let ccr: ReactWrapper;

  const mock: any = jest.fn();
  const props: Props = {
    match: mock,
    location: mock,
    history: {
      goBack: mock,
    } as any,

    setRoomId: mock,
    clearMessage: mock,
  };

  const generateFakeStore = (initState: StoreState) => {
    const mockStore = createMockStore();
    return mockStore(initState);
  };

  it('render', () => {
    const store = generateFakeStore({
      user: {
        user: 'userId',
        users: {
          ['userId']: 'sockid',
        },
      },
      room: { },
    });
    component = mount(<Provider store={store}>
      <ChoiceChatRoom {...props} />
    </Provider>);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('find ChoiceChatRoom component', () => {
    ccr = component.find('ChoiceChatRoom');
    expect(ccr).toHaveLength(1);
  });

});
