import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';

export const TaskList = ({ todos, onDeleted, onToggleDone, changeText, tick, onClickPaused, onClickPlay }) => {
  let elements = todos.map((item) => {
    return (
      <Task
        key={item.id}
        onDeleted={onDeleted}
        onToggleDone={onToggleDone}
        item={item}
        changeText={changeText}
        tick={tick}
        onClickPaused={onClickPaused}
        onClickPlay={onClickPlay}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  changeText: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  onDeleted() {},
  onToggleDone() {},
  changeText() {},
};
