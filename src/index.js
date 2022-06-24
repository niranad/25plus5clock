import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConnectedControl from './TimerControl';
import { reducer } from './redux/reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedControl />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

