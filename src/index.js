import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { fromJS, Map as map } from 'immutable';
import thunk from 'redux-thunk';
import App from './app';
import './main.css';
import reducer from './reducers';

const logger = ({getState, dispatch}) => next => action => {
  console.log('Ejecuta acción', action);
  const doIt = next(action);
  console.log('Mi estado', getState().toJS());
  return doIt;
}

const store = createStore(
  reducer,
  map(),
  //enhancer
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  applyMiddleware(
    logger,
    thunk
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app')
);
