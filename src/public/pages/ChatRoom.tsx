import { connect } from 'react-redux';
import React, { Component } from 'react';
import { RouteProps } from 'react-router';

// models
import { IMessage, StoreState } from '../../models/client';
import { IMessage as IServerMessage, IRoom } from '../../models/server';

// components
import ChatHistory from '../Components/ChatHistory';
import ChatInput from '../Components/ChatInput';

// etc
import { history } from '../utils';
import socket, { reqRooms, reqSendMessage } from '../controllers/socket';

export interface Props extends RouteProps {
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
      history.push('/');
    } else if (!roomId) {
      history.push('/room');
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { user, roomId } = nextProps;

    if (!user) {
      history.push('/');
    } else if (!roomId) {
      history.push('/room');
    }
  }

  onSendMessage = (msg: IMessage) => {
    const { roomId } = this.props;
    reqSendMessage({ ...msg, roomId });
  }

  onInvite = () => {
    const { roomId } = this.props;
    history.push(`/room/${roomId}/invite`);
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
