import { connect } from 'react-redux';
import { RouteProps } from 'react-router';
import React, { Component, ChangeEvent, ReactNode, KeyboardEvent } from 'react';

// models
import { StoreState } from '../../models/client';

// etc
import { history } from '../utils';
import { reqUserLogin } from '../controllers/socket';

// image
const logo = require('../static/user.png');

export interface Props extends RouteProps {
  user?: string;
}

export interface States {
  value: string;
}

export class Login extends Component<Props, States> {
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
      this.onLogin();
    }
  }

  onLogin = () => {
    const { value } = this.state;

    if (value) {
      reqUserLogin(value);
    }
  }

  componentWillMount() {
    if (this.props.user) {
      history.push('/room');
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.user) {
      history.push('/room');
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
          <button onClick={this.onLogin} >Connect</button>
        </div>
      </div>
    </div>;
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = (state: StoreState) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
