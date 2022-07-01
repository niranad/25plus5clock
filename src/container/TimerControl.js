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
} from '../redux/actions';

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

class CountDownClock extends Component {
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
    // format minutes and seconds as string
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

    if (minutes === 0 && seconds === 0) {
      document.querySelector('#beep').play();
    }

    return (
      <div className='app'>
        <header>
          <h1 className='head-text'>25 + 5 Clock</h1>
        </header>

        <div className='length-control-div'>
          <div id='break-control' className='length-control break-control'>
            <h2 id='break-label' className='label'>
              Break Length
            </h2>

            <div className='control-butt-div'>
              <button
                id='break-decrement'
                className='control-butt'
                onClick={onBreakDecrement}
                title='Break Decrement'
              >
                <i className='fas fa-arrow-down length-control-icon' />
              </button>
              <span id='break-length' className='length-display'>
                {breakLength}
              </span>
              <button
                id='break-increment'
                className='control-butt'
                onClick={onBreakIncrement}
                title='Break Increment'
              >
                <i className='fas fa-arrow-up length-control-icon' />
              </button>
            </div>
          </div>

          <div id='session-control' className='length-control session-control'>
            <h2 id='session-label' className='label'>
              Session Length
            </h2>
            <div className='control-butt-div'>
              <button
                id='session-decrement'
                className='control-butt'
                onClick={onSessionDecrement}
                title='Session Decrement'
              >
                <i className='fas fa-arrow-down length-control-icon'></i>
              </button>
              <span id='session-length' className='length-display'>
                {sessionLength}
              </span>
              <button
                id='session-increment'
                className='control-butt'
                onClick={onSessionIncrement}
                title='Session Increment'
              >
                <i className='fas fa-arrow-up length-control-icon' />
              </button>
            </div>
          </div>
        </div>
        
        <div id='timer' className='timer'>
          <h3
            id='timer-label'
            className={`timer-label label${
              minutes === 0 ? ' danger-time' : ''
            }`}
          >
            {sessionComplete ? 'Break' : 'Session'}
          </h3>
          <time
            id='time-left'
            className={`time-display${minutes === 0 ? ' danger-time' : ''}`}
          >
            {formatTime(minutes, seconds)}
          </time>
        </div>

        <div className='clock-control-div'>
          <button
            id='start_stop'
            title='Start-Stop'
            className='control-butt clock-control-butt'
            onClick={this.handleStartStop}
          >
            <i className='fas fa-play' />
            <i className='fas fa-pause' />
          </button>
          <button
            id='reset'
            title='Reset'
            className='control-butt clock-control-butt'
            onClick={this.handleReset}
          >
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

const Container = connect(mapStateToProps, mapDispatchToProps)(CountDownClock);

export default Container;

