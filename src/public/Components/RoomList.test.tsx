import React from 'react';
import { shallow } from 'enzyme';
import RoomList from './RoomList';
import { IRoom } from 'models/server';

describe('채팅방 목록', () => {
  let component: any = null;
  const mockOnRoomClick = jest.fn();
  const room: IRoom = {
    ['roomid1']: {
      creator: 'userid',
      name: 'roomname',
      users: {
        ['userid1']: 'sockid',
        ['userid2']: null,
      },
    },
  };

  it('renders correctly', () => {
    component = shallow(<RoomList rooms={room} onRoomClick={mockOnRoomClick} />);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('채팅방 이름 확인', () => {
    const div = component.find('.name');
    expect(div.at(0).text()).toBe('roomname');
  });

  it('채팅방 생성자 이름 확인', () => {
    const span = component.find('.status>span');
    expect(span.at(0).text()).toBe(' created by userid');

  });

  it('입력 이벤트 함수 동작 확인', () => {
    const li = component.find('li');
    li.at(0).simulate('click');
    expect(mockOnRoomClick.mock.calls.length).toBe(1);
  });

});
