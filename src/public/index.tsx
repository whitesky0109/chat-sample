import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import './controllers/socket';

import PageRouter from './PageRouter';

import './sass/index.scss';

ReactDom.render(

    <Provider store={store}>
        <PageRouter />
    </Provider>,

    document.getElementById('root'),
);
