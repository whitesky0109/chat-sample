import _ from 'lodash';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import React, { Component, ReactNode } from 'react';

// models
import { StoreState } from 'models/client';
import { IUser, IInvite, IRoom } from 'models/server';

// etc
import { reqUsers, reqInvite } from '../controllers/socket';

export interface Props extends RouteComponentProps {
  room?: IRoom;
  roomId?: string;
  user?: string;
  users?: IUser;
}

export class InviteUser extends Component<Props> {

  componentWillMount() {
    const { roomId, history } = this.props;

    if (!roomId) {
      history.push('/room');
      return;
    }

    reqUsers();
  }

  shouldComponentUpdate(nextProps: Props) {
    const { history } = this.props;

    if (!nextProps.roomId) {
      history.push('/room');
      return false;
    }

    return true;
  }

  onInviteUser = (id: string) => {
    const { roomId, history } = this.props;
    if (!roomId) {
      return;
    }

    const msg: IInvite = {
      roomId,
      users: [id],
    };

    reqInvite(msg);
    history.push(`/room/${roomId}`);
  }

  renderList(): ReactNode[] {
    const { users } = this.props;

    if (!users) {
      return [];
    }

    const result: ReactNode[] = _.map(users, (user, id: string) => {
      const { room, roomId } = this.props;

      if (!room || !roomId) {
        return;
      }
      const { users: invitedUsers } = room[roomId];
      const userIds = _.map(invitedUsers, (_, userId) => userId);

      if (userIds.includes(id)) {
        return;
      }

      return (<li className="user clearfix" key={id} onClick={this.onInviteUser.bind(this, id)}>
        <div className="user-icon">
          <i className="fa fa-users" />
        </div>
        <div className="about">
          <div className="name">{id}</div>
          <div className="status">
            <i className="fa fa-user" />
            <span> Online</span>
          </div>
        </div>
      </li>);
    });

    return result.filter(value => value);
  }

  render() {
    const list = this.renderList();

    const view = list.length
      ? <ul className="list">
        {this.renderList()}
      </ul>
      : <>does not exist User</>;

    return <div className="container">
      <div className="people-list" id="people-list">
        <div className="users">
          {view}
        </div>
      </div>
    </div>;
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
    users: user.users,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteUser);
