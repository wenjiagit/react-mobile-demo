import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
    middlewareUtils,
    createConnectHOC,
    middlewarePromise,
    connect as _connect,
    getActionsAndReducers,
    middlewareAsyncActionCallback,
    middlewareSyncReducerToLocalStorage,
} from 'sx-redux';
import * as models from './all-models';

const {actions, reducers} = getActionsAndReducers({models});
const middleware = [
    thunkMiddleware,
    middlewarePromise,
    middlewareAsyncActionCallback,
    middlewareUtils,
    middlewareSyncReducerToLocalStorage,
];

export function configureStore(initialState) {
    return applyMiddleware(...middleware)(createStore)(combineReducers(reducers), initialState);
}

// 与redux进行连接 函数
export const connectComponent = _connect({actions, options: {withRef: true}});

// 与redux进行连接 装饰器
export const connect = createConnectHOC(connectComponent);


