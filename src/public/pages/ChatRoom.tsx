import { connect } from 'react-redux';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

// models
import { IMessage, StoreState } from 'models/client';
import { IMessage as IServerMessage, IRoom } from 'models/server';

// components
import ChatHistory from '../components/ChatHistory';
import ChatInput from '../components/ChatInput';

// etc
import socket, { reqRooms, reqSendMessage, reqLeaveRoom } from '../controllers/socket';

export interface Props extends RouteComponentProps {
  room?: IRoom;
  roomId?: string;
  user?: string;
  messages?: IServerMessage[];
}

export class ChatRoom extends Component<Props> {

  propChecker(props: Props) {
    const { history } = this.props;
    const { user, roomId, room } = props;

    if (!room) {
      reqRooms();
      return false;
    }

    if (!roomId || !user) {
      history.goBack();
      return false;
    }

    return true;
  }

  componentWillMount() {
    this.propChecker(this.props);
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.propChecker(nextProps);
  }

  onSendMessage = (msg: IMessage) => {
    const { roomId } = this.props;
    reqSendMessage({ ...msg, roomId });
  }

  onInvite = () => {
    const { roomId, history } = this.props;
    history.push(`/room/${roomId}/invite`);
  }

  leaveRoom = () => {
    const { roomId } = this.props;

    if (roomId) {
      reqLeaveRoom(roomId);
    }
  }

  render() {
    const { room, roomId, messages, user } = this.props;
    const ids: string[] = [];

    if (!roomId || !room) {
      return (
        <> </>
      );
    }

    let count = 0;
    if (room && roomId) {
      const roomUser = room[roomId].users;
      for (const userId in roomUser) {
        if (roomUser[userId]) {
          count += 1;
        }
        ids.push(userId);
      }
    }

    return (
      <>
      <div className="header">
        <div className="title">
          <div className="user-icon">
            <i className="fa fa-users" />
          </div>
          <div className="about">
            <div className="chat-with">{room[roomId].name}</div>
            <div className="chat-num-messages">created by {user}</div>
          </div>
        </div>
        <div className="btn-group">
          <div>
            <div>사용자 수 : {ids.length}</div>
            <div>접속자 수 : {count}</div>
          </div>
          <button className="btn" onClick={this.onInvite} title="사용자 초대">
            <i className="fa fa-user" />
          </button>
          <button className="btn" onClick={this.leaveRoom} title="방 나가기">
            <i className="fa fa-sign-out" />
          </button>
        </div>
      </div>

      <ChatHistory messages={messages ? messages : []} />
      <ChatInput onSendMessage={this.onSendMessage} />
      </>
    );
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
    messages: room.messages,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
