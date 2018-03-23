import nextConnectRedux from 'next-connect-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from '../reducers/reducer';
import thunkMiddleware from 'redux-thunk';

const initStore = initialState => createStore(reducer, initialState, applyMiddleware(thunkMiddleware));

export const nextConnect = nextConnectRedux(initStore);
