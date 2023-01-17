import './main.css';
import React from 'react';
import PropTypes from 'prop-types';

import TaskList from '../taskList';

export default class Main extends React.Component {
  render() {
    const { todos, onDeleted, onToggleDone, data, onSubmit } = this.props;

    return (
      <section className="main">
        <TaskList onDeleted={onDeleted} todos={todos} onToggleDone={onToggleDone} data={data} onSubmit={onSubmit} />
      </section>
    );
  }
}

Main.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  data: PropTypes.number.isRequired,
};

Main.defaultProps = {
  onDeleted() {},
  onToggleDone() {},
};
