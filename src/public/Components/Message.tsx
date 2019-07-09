import React, { Component, ReactNode } from 'react';

// models
import { IMessage } from 'models/server';

export interface Props extends IMessage {

}

export default class Message extends Component<Props> {

  renderText(): ReactNode {
    const { message } = this.props;

    return (
      <>
        {message}
      </>
    );
  }

  getImageSrc(type: string, message: ArrayBuffer) {
    const bytes = new Uint8Array(message);
    const rawStr = bytes.reduce((data, byte) => data + String.fromCharCode(byte), '');

    return `data:${type};base64,${btoa(rawStr)}`;
  }

  renderImage(): ReactNode {
    const { message, type } = this.props;
    const imageSrc = this.getImageSrc(type, message as ArrayBuffer);

    return (
      <img src={imageSrc} alt="" />
    );
  }

  render() {
    const { type } = this.props;
    const msg = type === 'text'
      ? this.renderText()
      : this.renderImage();

    return (
      <div>
        {msg}
      </div>
    );
  }
}
