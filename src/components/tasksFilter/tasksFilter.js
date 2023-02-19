import React from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends React.Component {
  filters = ['all', 'active', 'completed'];
  render() {
    const { changeFilter, filter } = this.props;
    return (
      <ul className="filters">
        {this.filters.map((item) => {
          return (
            <li key={item}>
              <button className={filter == item ? 'selected' : undefined} onClick={() => changeFilter(item)}>
                {item}
              </button>
            </li>
          );
        })}
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
