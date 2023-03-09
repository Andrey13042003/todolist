import React from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends React.Component {
  render() {
    const { changeFilter, filter } = this.props;
    return (
      <ul className="filters">
        <li>
          <button className={filter == 'all' && 'selected'} onClick={() => changeFilter('all')}>
            All
          </button>
        </li>
        <li>
          <button className={filter == 'active' && 'selected'} onClick={() => changeFilter('active')}>
            Active
          </button>
        </li>
        <li>
          <button className={filter == 'completed' && 'selected'} onClick={() => changeFilter('completed')}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

TasksFilter.defaultProps = {
  changeFilter() {},
  filter: '',
};
