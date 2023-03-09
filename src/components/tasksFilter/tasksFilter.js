import React from 'react';
import PropTypes from 'prop-types';

export const TasksFilter = ({ changeFilter, filter, allPaused }) => {
  const filters = ['all', 'active', 'completed'];
  return (
    <ul className="filters">
      {filters.map((item) => {
        return (
          <li key={item}>
            <button
              className={filter == item ? 'selected' : undefined}
              onClick={function () {
                if (item == 'active' || item == 'completed') {
                  allPaused();
                }
                changeFilter(item);
              }}
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

TasksFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

TasksFilter.defaultProps = {
  changeFilter() {},
  filter: '',
};
