import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import React, { Component, ReactNode, ChangeEvent, KeyboardEvent } from 'react';

// models
import { StoreState } from 'models/client';

// components
import RoomList from '../components/RoomList';

// redux
import { setRoomId, clearMessage } from '../store/actions/roomAction';

// etc
import { reqAddRoom, reqRooms, reqEnterRoom } from '../controllers/socket';

export interface Props extends RouteComponentProps {
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
    const { history, user } = this.props;
    if (!user) {
      history.push('/');
      return;
    }

    setRoomId();
    clearMessage();
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
    reqEnterRoom(roomId);
  }

  shouldComponentUpdate(nextProps: Props) {
    const { history, roomId } = this.props;
    const { roomId: nextRoomId } = nextProps;
    if (nextRoomId) {
      if (roomId) {
        clearMessage();
      }
      history.push(`/room/${nextRoomId}`);
      return false;
    }

    return true;
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState({ value });
  }

  onInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {

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
