import React from 'react';
import PropTypes from 'prop-types';

import './tasksFilter.css';

export default class TasksFilter extends React.Component {
  render() {
    const { changeFilter } = this.props;
    return (
      <ul className="filters">
        <li>
          <button className="selected" onClick={() => changeFilter('all')}>
            All
          </button>
        </li>
        <li>
          <button onClick={() => changeFilter('active')}>Active</button>
        </li>
        <li>
          <button onClick={() => changeFilter('completed')}>Completed</button>
        </li>
        <li>
          <button className="clear-completed" onClick={() => changeFilter('clear completed')}>
            Clear completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
};

TasksFilter.defaultProps = {
  changeFilter() {},
};
