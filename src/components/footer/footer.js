import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasksFilter';

export default class Footer extends React.Component {
  render() {
    const { todo, changeFilter, clearCompleted, filter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">
          {todo}
          neet to do
        </span>
        <TasksFilter changeFilter={changeFilter} filter={filter} />
        <button className="clear-completed" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  todo: PropTypes.number.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  changeFilter() {},
};