import React from 'react';
import Countdown from 'react-countdown';

export default class CountDown extends React.Component {
  render() {
    return (
      <Countdown
        date={this.props.countDown}
        zeroPadTime={2}
        daysInHours={true}
        autoStart={false}
        ref={this.props.link}
        renderer={({ minutes, seconds, completed }) => {
          if (!completed) {
            this.props.changeTime(minutes, seconds);
          }
          return (
            <span>
              {minutes} : {seconds}
            </span>
          );
        }}
      ></Countdown>
    );
  }
}
