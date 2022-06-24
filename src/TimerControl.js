import { Component } from 'react';
import './TimerControl.css';
import { connect } from 'react-redux';
import {
  breakIncrement,
  breakDecrement,
  sessionIncrement,
  sessionDecrement,
  reset,
  startStop,
  countDown,
} from './redux/actions';

const mapStateToProps = (state) => {
  return {
    breakLength: state.breakLength,
    sessionLength: state.sessionLength,
    timerStarted: state.timerStarted,
    sessionComplete: state.sessionComplete,
    minutes: state.minutes,
    seconds: state.seconds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBreakIncrement: () => dispatch(breakIncrement()),
    onBreakDecrement: () => dispatch(breakDecrement()),
    onSessionIncrement: () => dispatch(sessionIncrement()),
    onSessionDecrement: () => dispatch(sessionDecrement()),
    onReset: () => dispatch(reset()),
    onStartStop: () => dispatch(startStop()),
    onCountDown: () => dispatch(countDown()),
  };
};

class CountDownTimerControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalID: null,
    };
  }

  handleStartStop = () => {
    this.props.onStartStop();

    if (!this.props.timerStarted) {
      this.setState({
        intervalID: setInterval(this.props.onCountDown, 1000),
      });
    } else {
      clearInterval(this.state.intervalID);
      this.setState({
        intervalID: null,
      });
    }
  };

  handleReset = () => {
    this.props.onReset();
    // stop audio and rewound
    const audio = document.querySelector('#beep');
    audio.pause();
    audio.currentTime = 0;
    // clear the current interval
    clearInterval(this.state.intervalID);
    this.setState({ intervalID: null });
  };

  render() {
    // format minutes and seconds as a string
    const formatTime = (mm, ss) => {
      return `${mm < 10 ? '0' : ''}${mm}:${ss < 10 ? '0' : ''}${ss}`;
    };

    const {
      breakLength,
      sessionLength,
      minutes,
      seconds,
      sessionComplete,
      onBreakDecrement,
      onBreakIncrement,
      onSessionDecrement,
      onSessionIncrement,
    } = this.props;

    if (sessionComplete) {
      document.querySelector('#beep').play();
    }

    return (
      <div className='App'>
        <header>
          <h1>25 + 5 Clock</h1>
        </header>

        <div>
          <h3 id='break-label'>Break Length</h3>
          <button
            id='break-decrement'
            onClick={onBreakDecrement}
            title='Break Decrement'
          >
            <i className='fas fa-arrow-down' />
          </button>
          <span id='break-length'>{breakLength}</span>
          <button
            id='break-increment'
            onClick={onBreakIncrement}
            title='Break Increment'
          >
            <i className='fas fa-arrow-up' />
          </button>
        </div>

        <div>
          <h3 id='session-label'>Session Length</h3>
          <button
            id='session-decrement'
            type='button'
            onClick={onSessionDecrement}
            title='Session Decrement'
          >
            <i className='fas fa-arrow-down'></i>
          </button>
          <span id='session-length'>{sessionLength}</span>
          <button
            id='session-increment'
            type='button'
            onClick={onSessionIncrement}
            title='Session Increment'
          >
            <i className='fas fa-arrow-up' />
          </button>
        </div>

        <div id='timer'>
          <h3 id='timer-label'>{sessionComplete ? 'Break' : 'Session'}</h3>
          <time id='time-left'>{formatTime(minutes, seconds)}</time>
        </div>

        <div>
          <button id='start_stop' onClick={this.handleStartStop}>
            <i className='fas fa-play' />
            <i className='fas fa-pause' />
          </button>
          <button id='reset' onClick={this.handleReset}>
            <i className='fas fa-refresh' />
          </button>
          <audio
            id='beep'
            preload='auto'
            src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
          ></audio>
        </div>
      </div>
    );
  }
}

const ConnectedControl = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountDownTimerControl);

export default ConnectedControl;


