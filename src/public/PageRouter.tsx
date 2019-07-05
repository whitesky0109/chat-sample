import React, { PureComponent, ReactNode } from 'react';
import { Route, Router } from 'react-router';
import { createHashHistory } from 'history';

// Components
import Login from './Login';

export default class PageRouter extends PureComponent {
  history = createHashHistory();

  render(): ReactNode {
    return <Router history={this.history}>
      <Route path="/" component={Login} />
    </Router>;
  }
}
