import _ from 'lodash';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import React, { Component, ReactNode } from 'react';

// models
import { StoreState } from 'models/client';
import { IUser, IInvite, IRoom } from 'models/server';

// etc
import { reqUsers, reqInvite, reqRooms } from '../controllers/socket';

export interface Props extends RouteComponentProps {
  room?: IRoom;
  roomId?: string;
  user?: string;
  users?: IUser;
}

export class InviteUser extends Component<Props> {

  propChecker(props: Props) {
    const { history } = this.props;
    const { roomId, user, room, users } = props;

    if (!room) {
      reqRooms();
      return false;
    }

    if (!users) {
      reqUsers();
      return false;
    }

    if (!user) {
      history.goBack();
      return false;
    }

    if (!roomId) {
      history.push('/room');
      return false;
    }

    return true;
  }

  componentWillMount() {
    this.propChecker(this.props);
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.propChecker(nextProps);
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
    history.goBack();
  }

  cancel = () => {
    const { history } = this.props;
    history.goBack();
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
      const online = user ? 'online' : 'offline';

      return (<li className="user clearfix" key={id} onClick={this.onInviteUser.bind(this, id)}>
        <div className="user-icon">
          <i className="fa fa-users" />
        </div>
        <div className="about">
          <div className="name">{id}</div>
          <div className="status">
            <i className={`fa fa-circle ${online}`} />
            <span> {online}</span>
          </div>
        </div>
      </li>);
    });

    return result.filter(value => value);
  }

  render() {
    const { room, roomId } = this.props;
    const list = this.renderList();

    if (!room || !roomId) {
      return;
    }

    const view = list.length
      ? <ul className="list">
        {this.renderList()}
      </ul>
      : <>does not exist User</>;

    return (
      <div className="container">
        <div className="header">
          <div className="title">
            <div className="user-icon">
              <i className="fa fa fa-user" />
            </div>
            <div className="about">
              <div className="chat-with">Invite User</div>
              <div className="chat-num-messages">Room Name : {room[roomId].name}</div>
            </div>
          </div>

          <div className="btn-group">
            <button className="btn" onClick={this.cancel} title="취소">
              <i className="fa fa-share-square-o" />
            </button>
          </div>
        </div>

        <div className="people-list" id="people-list">
          <div className="users">
            {view}
          </div>
        </div>
      </div>
    );
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
