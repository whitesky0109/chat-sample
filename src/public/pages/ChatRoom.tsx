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

  componentWillMount() {
    const { user, roomId } = this.props;

    reqRooms(roomId);
    if (!user) {
      this.props.history.push('/');
    } else if (!roomId) {
      this.props.history.push('/room');
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    const { user, roomId } = nextProps;
    const { history } = this.props;

    if (!user) {
      history.push('/');
      return false;
    }

    if (!roomId) {
      history.push('/room');
      return false;
    }

    return true;
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
    const { room, roomId, messages } = this.props;
    const ids: string[] = [];

    if (!roomId) {
      return;
    }

    if (room && room.users) {
      for (const userId in room.users) {
        ids.push(userId);
      }
    }
    ids.push(socket.id);

    return <>
      <button onClick={this.onInvite} >inVite</button>
      <button onClick={this.leaveRoom} >leave</button>

      <ChatHistory messages={messages ? messages : []} />
      <ChatInput onSendMessage={this.onSendMessage} />
    </>;
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
