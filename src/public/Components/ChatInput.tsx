import React, { Component, ChangeEvent, KeyboardEvent } from 'react';

// Models
import { IMessage } from 'models/client';

export interface Props {
  onSendMessage: (msg: IMessage) => void;
}

export interface States {
  value: string;
}

export default class ChatInput extends Component<Props, States> {
  state: States = {
    value: '',
  };

  sendMessage(type: string, message: string | File) {
    const { onSendMessage } = this.props;

    if (onSendMessage) {
      onSendMessage({
        type,
        message,
      });
    }
    this.setState({ value: '' });
  }

  inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState({ value });
  }

  inputKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.onSend();
    }
  }

  fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      for (let i = 0; i < files.length; i += 1) {
        const file = files.item(i);

        if (file) {
          this.sendMessage(file.type, file);
        }
      }
    }
  }

  onSend = () => {
    const { value } = this.state;

    if (value) {
      this.sendMessage('text', value);
    }
  }

  renderFileInput() {
    return <>
    <div className="file-input" >
      <label htmlFor="image" >
          <span className="fa fa-upload" aria-hidden="true" />
      </label>
      <input type="file" accept="image/*" id="image" className="image-input" onChange={this.fileChange} />
    </div>
    </>;
  }

  render() {
    const { value } = this.state;

    return <div className="chat-input clearfix">
      {this.renderFileInput()}

      <input
        type="text"
        value={value}
        onChange={this.inputChange}
        onKeyDown={this.inputKeyPress}
        placeholder="Type your message"
      />

      <button onClick={this.onSend}>Send</button>
    </div>;
  }
}
