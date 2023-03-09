import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './newTaskForm.css';

export const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinuteChange = (e) => {
    let minValue = Number(e.target.value);
    minValue && minValue < 60 ? setMin(minValue) : setMin('');
  };

  const onSecondChange = (e) => {
    let secValue = Number(e.target.value);
    secValue && secValue < 60 ? setSec(secValue) : setSec('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (/\S/.test(label)) {
      let time = min * 60 + sec;
      onItemAdded(label, time);
    }
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <form onSubmit={onSubmit} className="search_form">
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onLabelChange}
        value={label}
        autoFocus
      />
      <input type="submit" className="submit" />
      <input type="text" className="new-todo-form__timer" placeholder="Min" value={min} onChange={onMinuteChange} />
      <input type="text" className="new-todo-form__timer" placeholder="Sec" value={sec} onChange={onSecondChange} />
    </form>
  );
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  onItemAdded() {},
};
