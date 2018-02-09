import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import  { wrapStore }  from './socket-client/api.js'

wrapStore(store,`http://localhost:8090`);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
