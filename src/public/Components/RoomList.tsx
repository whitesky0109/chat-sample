import _ from 'lodash';
import React, { Component, ReactNode } from 'react';
import { IRoom } from '../../models/server';

export interface Props {
  rooms: IRoom;
  onRoomClick: (roomId: string) => void;
}

export default class RoomList extends Component<Props> {

  onClickItem = (roomId: string) => {
    const { onRoomClick } = this.props;

    if (onRoomClick) {
      onRoomClick(roomId);
    }
  }

  renderList(): ReactNode {
    const { rooms } = this.props;
    return _.map(rooms, (room, roomId: string) => {
      return (<li className="user clearfix" key={roomId} onClick={this.onClickItem.bind(this, roomId)}>
        <div className="user-icon">
          <i className="fa fa-users" />
        </div>
        <div className="about">
          <div className="name">{room.name}</div>
          <div className="status">
            <i className="fa fa-user" />
            <span> created by {room.creator}</span>
          </div>
        </div>
      </li>);
    });
  }

  render() {
    const { rooms } = this.props;
    if (!rooms || rooms === {}) {
      return <></>;
    }

    return <div className="users">
      <div className="empty" />
      <ul className="list">
        {this.renderList()}
      </ul>
    </div>;
  }
}
