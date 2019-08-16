import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import '../styles/index.css';
import { rednotReducer, Rednot } from '../index';

const store = createStore(combineReducers({ rednot: rednotReducer }),
  composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render((
  <Provider store={store}>
    <App />
    <Rednot />
  </Provider>
), document.getElementById('root'));
