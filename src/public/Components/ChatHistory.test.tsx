import React from 'react';
import { shallow } from 'enzyme';
import ChatHistory from './ChatHistory';
import { IMessage } from 'models/server';
const moment = require('moment');

describe('ChatHistory', () => {
  let component: any = null;
  const messages: IMessage[] = [{
    date: new Date(0),
    isMy: true,
    message: 'my message',
    type: 'text',
    userId: 'userid',
  }];

  it('renders correctly', () => {

    component = shallow(<ChatHistory messages={messages} />);
  });
  it('사용자 이름 확인', () => {
    expect(component.find('.msg-name').text()).toBe(messages[0].userId);
  });

  it('우측 포지션 확인', () => {
    const { className } = component.find('.msg-data').props();
    const pos = className.split(' ')[1];
    expect(pos).toBe('align-right');
  });

  it('좌측 포지션 확인', () => {
    messages[0].isMy = false;
    component = shallow(<ChatHistory messages={messages} />);
    const { className } = component.find('.msg-data').props();
    const pos = className.split(' ')[1];
    expect(pos).toBe('align-left');
  });

  it('시간 확인', () => {
    const text = component.find('.msg-time').text();
    const dateStr = moment(messages[0].date).format('YYYY년 MM월 DD일 (ddd) hh:mm:ss');
    expect(text).toBe(dateStr);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

});
