import { connect } from 'react-redux';
import { RouteProps } from 'react-router';
import React, { Component, ReactNode, ChangeEvent, KeyboardEvent } from 'react';

// models
import { StoreState } from '../../models/client';

// components
import RoomList from '../Components/RoomList';

// redux
import { setRoomId } from '../redux/actions/roomAction';

// etc
import { history } from '../utils';
import { reqAddRoom, reqRooms } from '../controllers/socket';

export interface Props extends RouteProps {
  room: any;
  roomId?: string;
  user?: string;
}

export interface States {
  value: string;
}

export class ChoiceChatRoom extends Component<Props, States> {
  state: States = {
    value: '',
  };

  componentWillMount() {
    if (!this.props.user) {
      history.push('/');
      return;
    }

    setRoomId();
    reqRooms();
  }

  addRoom = () => {
    const { value } = this.state;
    if (value) {
      reqAddRoom(value);
    }
    this.setState({ value: '' });
  }

  enterRoom = (roomId: string) => {
    setRoomId(roomId);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { roomId } = nextProps;
    if (roomId) {
      history.push(`/room/${roomId}`);
    }
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
    const { room } = this.props;
    const { value } = this.state;

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

const mapDispatchToProps = {
};

const mapStateToProps = (state: StoreState) => {
  const { room, user } = state;
  return {
    room: room.room,
    user: user.user,
    roomId: room.roomId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceChatRoom);
