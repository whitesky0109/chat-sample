import _ from 'lodash';
import React, { Component } from 'react';

// models
import { IUser, IInvite } from '../../models/server';

// etc
import { socket, history } from '../utils';

export interface Props {
  roomId: string;
}

export interface States {
  users: IUser;
  userIds: string[];
}

export default class InviteUser extends Component<Props, States> {

  state: States = {
    users: {},
    userIds: [],
  };

  componentWillMount() {
    socket.on('users', this.getUsers);
    socket.emit('users');
  }
  componentWillUnmount() {
    socket.off('users');
  }

  getUsers = (users: IUser) => {
    if (!users) {
      history.push('/');
      return;
    }
    this.setState({ users });
  }

  addUser = (userId: string) => {
    const { userIds } = this.state;
    this.setState({
      userIds: [...userIds, userId],
    });
  }

  onInviteUser = () => {
    const { roomId } = this.props;
    const { userIds: users } = this.state;
    const msg: IInvite = {
      roomId,
      users,
    };

    socket.emit('room/invite', msg);
  }

  render() {
    const { users, userIds } = this.state;
    const liDom = _.map(users, (name, id) => {
      if (userIds.includes(id)) {
        return;
      }

      return <li key={id} onClick={this.addUser.bind(this, id)}>{name}</li>;
    });

    return <><ul>
      {liDom}
    </ul>
      <button onClick={this.onInviteUser}>Invite</button>
    </>;
  }
}
