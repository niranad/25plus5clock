import {
  BREAK_INCREMENT,
  BREAK_DECREMENT,
  SESSION_INCREMENT,
  SESSION_DECREMENT,
  RESET,
  START_STOP,
  COUNT_DOWN,
} from './constants';

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timerStarted: false,
  sessionComplete: false,
  minutes: 25,
  seconds: 0,
};

export const reducer = (state = initialState, action = {}) => {
  let sessionLength, breakLength;

  switch (action.type) {
    case BREAK_INCREMENT:
      breakLength =
        state.breakLength < 60 ? state.breakLength + 1 : state.breakLength;
      return !state.timerStarted
        ? Object.assign({}, state, {
            breakLength,
            minutes: state.sessionComplete ? breakLength : state.sessionLength,
            seconds: 0,
          })
        : state;

    case BREAK_DECREMENT:
      breakLength =
        state.breakLength > 1 ? state.breakLength - 1 : state.breakLength;
      return !state.timerStarted
        ? Object.assign({}, state, {
            breakLength,
            minutes: state.sessionComplete ? breakLength : state.sessionLength,
            seconds: 0,
          })
        : state;

    case SESSION_INCREMENT:
      sessionLength =
        state.sessionLength < 60
          ? state.sessionLength + 1
          : state.sessionLength;
      return !state.timerStarted
        ? Object.assign({}, state, {
            sessionLength,
            minutes: !state.sessionComplete ? sessionLength : state.breakLength,
            seconds: 0,
          })
        : state;

    case SESSION_DECREMENT:
      sessionLength =
        state.sessionLength > 1 ? state.sessionLength - 1 : state.sessionLength;
      return !state.timerStarted
        ? Object.assign({}, state, {
            sessionLength,
            minutes: !state.sessionComplete ? sessionLength : state.breakLength,
            seconds: 0,
          })
        : state;

    case RESET:
      return Object.assign({}, state, {
        breakLength: 5,
        sessionLength: 25,
        minutes: 25,
        seconds: 0,
        timerStarted: false,
        sessionComplete: false,
      });

    case START_STOP:
      return Object.assign({}, state, { timerStarted: !state.timerStarted });

    case COUNT_DOWN:
      if (state.minutes > 0) {
        if (state.seconds === 0) {
          return Object.assign({}, state, {
            minutes: state.minutes - 1,
            seconds: 59,
          });
        }
        if (state.seconds > 0) {
          return Object.assign({}, state, { seconds: state.seconds - 1 });
        }
      }

      // if session is still on
      if (!state.sessionComplete) {
        if (state.minutes === 0) {
          if (state.seconds === 0) {
            return Object.assign({}, state, {
              sessionComplete: true,
              minutes: state.breakLength,
            });
          }
          if (state.seconds > 0) {
            return Object.assign({}, state, { seconds: state.seconds - 1 });
          }
        }
      } else {
        if (state.minutes === 0) {
          if (state.seconds === 0) {
            return Object.assign({}, state, {
              sessionComplete: false,
              minutes: state.sessionLength,
            });
          }
          if (state.seconds > 0) {
            return Object.assign({}, state, { seconds: state.seconds - 1 });
          }
        }
      }
      break;

    default:
      return state;
  }
};
