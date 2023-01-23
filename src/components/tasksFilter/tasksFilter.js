import React from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends React.Component {
  render() {
    const { changeFilter, filter } = this.props;
    let all = null;
    let active = null;
    let completed = null;

    switch (filter) {
    case 'all':
      all = 'selected';
      break;
    case 'active':
      active = 'selected';
      break;
    case 'completed':
      completed = 'selected';
      break;
    }
    return (
      <ul className="filters">
        <li>
          <button className={all} onClick={() => changeFilter('all')}>
            All
          </button>
        </li>
        <li>
          <button className={active} onClick={() => changeFilter('active')}>
            Active
          </button>
        </li>
        <li>
          <button className={completed} onClick={() => changeFilter('completed')}>
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
