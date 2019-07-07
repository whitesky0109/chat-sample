import React, { Component } from 'react';
import { RouteProps } from 'react-router';

// models
import { IMessage } from '../../models/client';
import { IMessage as IServerMessage } from '../../models/server';

// components
import InviteUser from '../Components/Invite';
import ChatHistory from '../Components/ChatHistory';

// etc
import { socket } from '../utils';
import ChatInput from '../Components/ChatInput';

export interface Props extends RouteProps {
  match: any;
}

export interface States {
  messages: IServerMessage[];
  isInvite: boolean;
}

export default class ChatRoom extends Component<Props, States> {
  roomId: string;
  state: States = {
    messages: [],
    isInvite: false,
  };

  componentWillMount() {
    const { match } = this.props;
    this.roomId = match ? match.params.roomId : null;
    socket.on('room/message', this.onMessage);
  }

  componentWillUnmount() {
    socket.off('room/message');
  }

  onMessage = (msg: IServerMessage) => {
    const { messages } = this.state;
    this.setState({
      messages: [...messages, msg],
    });
  }

  onSendMessage = (msg: IMessage) => {
    socket.emit('room/message', msg);
  }

  onInvite = () => {
    const { isInvite } = this.state;

    this.setState({ isInvite: !isInvite });
  }

  render() {
    const { messages, isInvite } = this.state;

    return <>
      {isInvite ? <InviteUser roomId={this.roomId} /> : null}
      <button onClick={this.onInvite} >inVite</button>

      <ChatHistory messages={messages} />
      <ChatInput roomId={this.roomId} onSendMessage={this.onSendMessage} />

    </>;
  }
}
