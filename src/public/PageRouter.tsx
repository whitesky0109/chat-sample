import React, { PureComponent, ReactNode } from 'react';
import { Route, Router, Redirect } from 'react-router';
import { createHashHistory } from 'history';

// Components
import Login from './pages/Login';
import ChoiceChatRoom from './pages/ChoiceChatRoom';
import ChatRoom from './pages/ChatRoom';
import InviteUser from './pages/InviteUser';

export const history = createHashHistory();

export default class PageRouter extends PureComponent {
  render(): ReactNode {
    return <Router history={history}>
      <Route path="/" component={Login} exact={true} />
      <Route path="/room" component={ChoiceChatRoom} exact={true} />
      <Route path="/room/:roomId" component={ChatRoom} exact={true} />
      <Route path="/room/:roomId/invite" component={InviteUser} exact={true} />
      <Redirect from="*" to="/" />
    </Router>;
  }
}
