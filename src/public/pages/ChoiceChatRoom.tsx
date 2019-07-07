import React, { Component, ReactNode, ChangeEvent, KeyboardEvent } from 'react';
import { RouteProps } from 'react-router';

// etc
import { socket, history } from '../utils';
import RoomList from '../Components/RoomList';

export interface Props extends RouteProps {

}

export interface States {
  room: any;
  value: string;
}

export default class ChoiceChatRoom extends Component<Props, States> {
  state: States = {
    room: {},
    value: '',
  };

  componentWillMount() {
    socket.on('room', this.updateRooms);

    if (!socket.connected) {
      socket.on('connect', () => socket.emit('room'));
    } else {
      socket.emit('room');
    }
  }

  componentWillUnmount() {
    socket.off('room');
  }

  updateRooms = (room: any) => {
    if (room) {
      this.setState({ room });
    } else {
      history.push('/');
    }
  }

  addRoom = () => {
    const { value: name } = this.state;
    if (name) {
      socket.emit('room/new', { name });
    }
    this.setState({ value: '' });
  }

  enterRoom = (roomId: string) => {
    history.push(`/room/${roomId}`);
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState({ value });
  }

  onInputKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {

    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.addRoom();
    }
  }
  render(): ReactNode {
    const { room, value } = this.state;

    return <div className="container">

      <div className="people-list" id="people-list">

        <div className="room-input">
          <input
            className="text"
            placeholder="Type Chat room name"
            value={value}
            onChange={this.onInputChange}
            onKeyDown={this.onInputKeyPress}
          />
          <button onClick={this.addRoom}><i className="fa fa-plus" /></button>
        </div>

        <RoomList rooms={room} onRoomClick={this.enterRoom} />
      </div>
    </div>;
  }
}
