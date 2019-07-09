import moment from 'moment';
import React, { Component, ReactNode } from 'react';
const classnames = require('classnames');

// models
import { IMessage } from 'models/server';

// Components
import Message from './Message';

export interface Props {
  messages: IMessage[];
}

export default class ChatHistory extends Component<Props> {
  messagesEnd?: HTMLDivElement;

  renderMyData(username: string, date: string): ReactNode {
    return <div className="msg-data align-right">
      <span className="msg-time" >{date}</span>
      <span className="msg-name" >{username}</span>
    </div>;
  }

  renderOterData(username: string, date: string): ReactNode {
    return <div className="msg-data align-left">
      <span className="msg-name" >{username}</span>
      <span className="msg-time" >{date}</span>
    </div>;
  }

  renderMessage(key: number, message: IMessage): ReactNode {
    const { date, userId, isMy } = message;
    const dateStr = moment(date).format('YYYY년 MM월 DD일 (ddd) hh:mm:ss');
    const dataDom = message.isMy
      ? this.renderMyData(userId, dateStr)
      : this.renderOterData(userId, dateStr);
    const msgCls = classnames({
      'float-right': isMy,
      'float-left': !isMy,
    });

    return <li key={key} className="clearfix">
      {dataDom}

      <div className={`msg other-msg ${msgCls}`}>
        <Message {...message} />
      </div>
    </li >;
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    const { messages } = this.props;
    const messageRender = messages.map((message, index) => {
      return this.renderMessage(index, message);
    });

    const setMessageDiv = (el: HTMLDivElement) => { this.messagesEnd = el; };

    return <div className="chat-history">
      <ul>
        {messageRender}
      </ul>
      <div ref={setMessageDiv} />
    </div>;
  }
}
