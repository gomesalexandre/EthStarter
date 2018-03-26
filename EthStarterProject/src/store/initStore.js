import nextConnectRedux from 'next-connect-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from '../reducers/reducer';
import thunk from 'redux-thunk';

const initStore = initialState => createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, logger));

export const nextConnect = nextConnectRedux(initStore);
