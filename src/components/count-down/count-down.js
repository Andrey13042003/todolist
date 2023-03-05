import React from 'react';

export default class CountDown extends React.Component {
  state = {
    time: this.props.time,
  };

  componentDidMount() {
    const { tick, id, timerActive } = this.props;
    if (timerActive) {
      this.interval = setInterval(() => tick(id), 1000);
    }
  }

  componentDidUpdate(prevProps) {
    const { tick, id, timerActive, time } = this.props; //timerActive = false, но таймер идет
    if (time == 0) {
      clearInterval(this.interval);
    }
    if (timerActive !== prevProps.timerActive) {
      if (timerActive) {
        this.interval = setInterval(() => tick(id), 1000);
      } else {
        clearInterval(this.interval);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timeReform = (time) => {
    let newMinute = Math.floor(time / 60);
    let newSeconds = time % 60;
    newMinute < 10 && (newMinute = '0' + newMinute);
    newSeconds < 10 && (newSeconds = '0' + newSeconds);

    return `${newMinute}:${newSeconds}`;
  };

  render() {
    const { time } = this.props;
    return <div>{this.timeReform(time)}</div>;
  }
}
