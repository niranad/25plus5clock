import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from './container/TimerControl';
import { reducer } from './redux/reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Container />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

