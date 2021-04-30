import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import counterReducer from './store/reducers/counter';
import resultsReducer from './store/reducers/results';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultsReducer
});

const logger = store => {
    return next => {
        return action => {
            console.log('[MIDDLEWARE] dispatching', action);
            const result = next(action);
            console.log('[MIDDLEWARE] next state', store.getState());
            return result;
        }
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
