import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import './controllers/socket';
import store from './store';

import { Route, Router, Redirect } from 'react-router';
import { createHashHistory } from 'history';

// Components
import Login from './pages/Login';
import ChoiceChatRoom from './pages/ChoiceChatRoom';
import ChatRoom from './pages/ChatRoom';
import InviteUser from './pages/InviteUser';

export const history = createHashHistory();

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Login} exact={true} />
            <Route path="/room" component={ChoiceChatRoom} exact={true} />
            <Route path="/room/:roomId" component={ChatRoom} exact={true} />
            <Route path="/room/:roomId/invite" component={InviteUser} exact={true} />
            <Redirect from="*" to="/" />
        </Router>;
    </Provider>,

    document.getElementById('root'),
);
