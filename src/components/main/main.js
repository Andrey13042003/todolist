import React from 'react';
import PropTypes from 'prop-types';

import TaskList from '../taskList';

export const Main = ({ todos, onDeleted, onToggleDone, changeText, filter, tick, onClickPaused, onClickPlay }) => {
  return (
    <section className="main">
      <TaskList
        onDeleted={onDeleted}
        todos={todos}
        onToggleDone={onToggleDone}
        changeText={changeText}
        filter={filter}
        tick={tick}
        onClickPaused={onClickPaused}
        onClickPlay={onClickPlay}
      />
    </section>
  );
};

Main.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  changeText: PropTypes.func.isRequired,
};

Main.defaultProps = {
  onDeleted() {},
  onToggleDone() {},
  changeText() {},
  todos: [],
};
