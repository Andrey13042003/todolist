import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import TasksFilter from '../tasksFilter';

export default class Footer extends React.Component {
  render() {
    const { todo, done, changeFilter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">
          {todo}
          more to do,
          {done}
          done
        </span>
        <TasksFilter changeFilter={changeFilter} />
      </footer>
    );
  }
}

Footer.propTypes = {
  todo: PropTypes.number.isRequired,
  done: PropTypes.number.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  changeFilter() {},
};
