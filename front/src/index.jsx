import 'file-loader?name=index.html!assets/index.html';

import './assets/images.loader.js';
import './assets/css.loader.js';
import './assets/js.loader.js';
import './assets/files.loader.js';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader'
import { configureStore } from './store/configureStore';
import {getRoute}  from './routes';

import AccountActions from './actions/AccountActions';

const store = configureStore(browserHistory, window.__initialState__);
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(AccountActions.initialize()).then(() => {
    setInterval(() => {
        store.dispatch(AccountActions.initialize());
    }, 30000);
    startProvider();
}).catch(error => {
    console.log(error);
    startProvider();
});

function startProvider() {
    ReactDOM.render(
        <AppContainer key={Math.random()} >
            <Provider store={store}>
                <Router history={history} routes={getRoute(store)} />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
}

if (module.hot) {
    module.hot.accept('./routes', () => {
        startProvider();
    });
}
