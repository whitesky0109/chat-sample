import React from 'react';
import { mount } from 'enzyme';
import ChatInput from './ChatInput';

describe('ChatInput', () => {
  let component: any = null;
  const mockOnSendMessage = jest.fn();

  it('renders correctly', () => {
    component = mount(<ChatInput onSendMessage={mockOnSendMessage} />);
  });

  it('텍스트 입력 변경 확인', () => {
    const input = component.find('input[type="text"]');
    const inputValue = 'abcdefg';

    expect(input).not.toBeUndefined();
    input.simulate('change', { target: { value: inputValue } });

    expect(component.state().value).toBe(inputValue);
  });

  it('입력 전달 확인', () => {
    const input = component.find('input[type="text"]');
    input.simulate('keydown', { keyCode: 13 });
    expect(mockOnSendMessage.mock.calls.length).toBe(1);
  });

  it('입력 자동 비움 확인', () => {
    expect(component.state().value).toBe('');
  });

  it('미입력 미전달 확인', () => {
    const input = component.find('input[type="text"]');
    input.simulate('keydown', { keyCode: 13 });
    expect(mockOnSendMessage.mock.calls.length).toBe(1);
  });

  it('이미지 전달 확인', () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    component.find('input[type="file"]').simulate('change', { target: { files: [file] } });
    expect(mockOnSendMessage.mock.calls.length).toBe(2);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

});
