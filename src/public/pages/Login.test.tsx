import React from 'react';
import { Provider } from 'react-redux';
import { mount, ReactWrapper } from 'enzyme';
import createMockStore from 'redux-mock-store';

import Login, { Props, States } from './Login';

import { StoreState } from 'models/client';

describe('Login', () => {
  let component: ReactWrapper;
  let loginComp: ReactWrapper;
  const mock: any = jest.fn();
  const mockStore = createMockStore();
  const initState: StoreState = {
    user: {},
    room: {},
  };
  const props: Props = {
    match: mock,
    location: mock,
    history: mock,
  };

  const store = mockStore(initState);

  it('render', () => {
    component = mount(<Provider store={store as any}>
      <Login {...props} />
    </Provider>);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('find login component', () => {
    loginComp = component.find('Login');
    expect(loginComp).toHaveLength(1);
  });

  it('입력 테스트', () => {
    const input: ReactWrapper = loginComp.find('.login-form>input');
    const inputValue = 'abcdefg';

    expect(input).not.toBeUndefined();
    input.simulate('change', { target: { value: inputValue } });

    expect((loginComp.state() as States).value).toBe(inputValue);
  });

});
