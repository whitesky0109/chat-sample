import React, { PureComponent, ReactNode } from 'react';
import { Route, Router } from 'react-router';

// Components
import Login from './pages/Login';
import { history } from './utils';
import ChoiceChatRoom from './pages/ChoiceChatRoom';
import ChatRoom from './pages/ChatRoom';

export default class PageRouter extends PureComponent {
  render(): ReactNode {
    return <Router history={history}>
      <Route path="/" component={Login} exact={true} />
      <Route path="/room" component={ChoiceChatRoom} exact={true} />
      <Route path="/room/:roomId" component={ChatRoom} />
    </Router>;
  }
}
