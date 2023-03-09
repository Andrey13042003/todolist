import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasksFilter';

export const Footer = ({ todo, changeFilter, clearCompleted, filter, allPaused }) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        {todo}
        need to do
      </span>
      <TasksFilter changeFilter={changeFilter} filter={filter} allPaused={allPaused} />
      <button className="clear-completed" onClick={() => clearCompleted()}>
        сlear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todo: PropTypes.number.isRequired,
  changeFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  changeFilter() {},
  clearCompleted() {},
  filter: '',
};
