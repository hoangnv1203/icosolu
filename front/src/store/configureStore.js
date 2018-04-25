import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/RootReducer';

export function configureStore(history, initialState) {

    const store = createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(thunk),
            applyMiddleware(
                routerMiddleware(history)
            ),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    return store;

}