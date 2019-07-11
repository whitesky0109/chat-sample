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
import { reqAddRoom, reqRooms, reqEnterRoom, reqUserLogout } from '../controllers/socket';

export interface Props extends RouteComponentProps {
  room?: any;
  roomId?: string;
  user?: string;

  setRoomId: typeof setRoomId;
  clearMessage: typeof clearMessage;
}

export interface States {
  value: string;
}

export class ChoiceChatRoom extends Component<Props, States> {
  state: States = {
    value: '',
  };

  componentWillMount() {
    const { history, user, setRoomId, clearMessage } = this.props;
    if (!user) {
      history.push('/');
      return;
    }

    setRoomId();
    clearMessage();
    reqRooms();
  }

  shouldComponentUpdate(nextProps: Props) {
    const { history, roomId } = this.props;
    const { roomId: nextRoomId, user } = nextProps;

    if (!user) {
      history.push('/');
      return false;
    }

    if (nextRoomId) {
      if (roomId) {
        clearMessage();
      }
      history.push(`/room/${nextRoomId}`);
      return false;
    }

    return true;
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

  logout = () => {
    reqUserLogout();
  }

  render(): ReactNode {
    const { room, user } = this.props;
    const { value } = this.state;

    if (!room || !user) {
      return (
        <> </>
      );
    }

    return (
      <div className="container">
        <div className="header">
          <div className="title">
            <div className="user-icon">
              <i className="fa fa fa-weixin" />
            </div>
            <div className="about">
              <div className="chat-with">{user}</div>
            </div>
          </div>

          <div className="btn-group">
            <button className="btn" onClick={this.logout} title="로그 아웃">
              <i className="fa fa-share-square-o" />
            </button>
          </div>
        </div>

        <div className="people-list" id="people-list">

          <div className="room-input">
            <input
              className="text"
              placeholder="Type Chat room name"
              value={value}
              onChange={this.onInputChange}
              onKeyDown={this.onInputKeyPress}
            />
            <button onClick={this.addRoom} title="방 만들기"><i className="fa fa-plus" /></button>
          </div>

          <RoomList rooms={room} onRoomClick={this.enterRoom} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setRoomId,
  clearMessage,
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
