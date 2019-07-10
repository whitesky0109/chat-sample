import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import React, { Component, ChangeEvent, ReactNode, KeyboardEvent } from 'react';

// models
import { StoreState } from 'models/client';

// etc
import { reqUserLogin } from '../controllers/socket';
import { clearAll } from 'public/store';

// image
const logo = require('../static/logo.png');

export interface Props extends RouteComponentProps {
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

  propsChecker(props: Props) {
    const { history } = this.props;
    const { user } = props;

    if (user) {
      history.push('/room');
      return false;
    }

    clearAll();
    return true;
  }

  componentWillMount() {
    this.propsChecker(this.props);
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.propsChecker(nextProps);
  }

  render(): ReactNode {
    const { value } = this.state;

    return (
      <div className="container login">
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
      </div>
    );
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
