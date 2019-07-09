import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import './controllers/socket';
import store from './store';

import PageRouter from './PageRouter';

ReactDom.render(

    <Provider store={store}>
        <PageRouter />
    </Provider>,

    document.getElementById('root'),
);
