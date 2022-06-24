import {
  BREAK_INCREMENT,
  BREAK_DECREMENT,
  SESSION_INCREMENT,
  SESSION_DECREMENT,
  RESET,
  START_STOP,
  COUNT_DOWN,
} from './constants';

export const breakIncrement = () => {
  return {
    type: BREAK_INCREMENT,
  };
};

export const breakDecrement = () => {
  return {
    type: BREAK_DECREMENT,
  };
};

export const sessionIncrement = () => {
  return {
    type: SESSION_INCREMENT,
  };
};

export const sessionDecrement = () => {
  return {
    type: SESSION_DECREMENT,
  };
};

export const startStop = () => {
  return {
    type: START_STOP,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};

export const countDown = () => {
  return {
    type: COUNT_DOWN,
  };
};
