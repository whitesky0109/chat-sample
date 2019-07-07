import React, { Component, ChangeEvent, ReactNode, KeyboardEvent } from 'react';

// etc
import { history, socket } from '../utils';

// image
const logo = require('../static/user.png');

export interface States {
  value: string;
}

export default class Login extends Component<{}, States> {
  state: States = {
    value: '',
  };

  inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ value });
  }

  inputKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {

    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.onConnect();
    }
  }

  onConnect = () => {
    const { value } = this.state;

    socket.emit('login', {
      name: value,
    });

    socket.on('login', this.onLogin);

  }

  componentWillUnmount() {
    socket.off('login');
  }

  onLogin = (value: string) => {
    if (value) {
      history.push(`/room${value ? `?name=${value}` : ''}`);
    } else {
      console.log('already exist user id');
    }
  }

  render(): ReactNode {
    const { value } = this.state;

    return <div className="container login">
      <div>
        <div className="first">
          <img src={logo} id="icon" alt="User Icon" />
        </div>

        <div className="login-form">
          <input
            type="text"
            placeholder="Type new your ID"
            value={value}
            onChange={this.inputChange}
            onKeyDown={this.inputKeyPress}
          />
          <button onClick={this.onConnect} >Connect</button>
        </div>
      </div>
    </div>;
  }
}
