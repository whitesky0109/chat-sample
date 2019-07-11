import React from 'react';
import { shallow, mount } from 'enzyme';
import { IMessage } from 'models/server';
import Message from './Message';

describe('Message', () => {
  let component: any = null;

  it('renders text', () => {
    const msg: IMessage = {
      userId: 'userId',
      type: 'text',
      message: 'hello world',
      date: new Date(0),
      isMy: true,
    };
    component = shallow(<Message {...msg}/>);
  });

  it('텍스트 확인', () => {
    const div = component.find('div').at(0);
    expect(div.text()).toBe('hello world');
  });

  it('renders image', () => {
    const msg: IMessage = {
      userId: 'userId',
      type: 'image/png',
      message: new ArrayBuffer(10),
      date: new Date(0),
      isMy: true,
    };
    component = shallow(<Message {...msg} />);
  });

  it('이미지 확인', () => {
    const bytes = new Uint8Array(new ArrayBuffer(10));
    const rawStr = bytes.reduce((data, byte) => data + String.fromCharCode(byte), '');

    const src: string = component.find('img').props().src;
    expect(src).toBe(`data:image/png;base64,${btoa(rawStr)}`);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
