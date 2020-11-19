import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Rednot, rednotReducer } from '../index';
import '../styles/index.css';
import App from './App';

const store = createStore(
  combineReducers({ rednot: rednotReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Rednot />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
