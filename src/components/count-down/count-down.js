import React, { useEffect, useRef, useState } from 'react';

let interval;
export const CountDown = ({ tick, id, timerActive, time }) => {
  const [timer, setTimer] = useState(time);
  const prevPropsActive = usePrevious(timerActive);

  useEffect(() => {
    if (timerActive !== prevPropsActive && typeof prevPropsActive != 'undefined') {
      if (timerActive) {
        interval = setInterval(() => tick(id), 1000);
      } else {
        clearInterval(interval);
      }
    }
  }, [timerActive]);

  useEffect(() => {
    setTimer(time);
    if (timer == 0) {
      clearInterval(interval);
    }
  }, [time]);

  useEffect(() => {
    clearInterval(interval);
  }, [id]);

  const timeReform = (timer) => {
    let newMinute = Math.floor(time / 60);
    let newSeconds = timer % 60;
    newMinute < 10 && (newMinute = '0' + newMinute);
    newSeconds < 10 && (newSeconds = '0' + newSeconds);

    return `${newMinute}:${newSeconds}`;
  };

  return <div>{timeReform(timer)}</div>;
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
