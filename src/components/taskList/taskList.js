import React from 'react';
import PropTypes from 'prop-types';

import './taskList.css';
import Task from '../task';

export default class TaskList extends React.Component {
  render() {
    const { todos, onDeleted, onToggleDone, data, onSubmit } = this.props;
    const elements = todos.map((item) => {
      return (
        <Task
          key={item.id} //подобрать id
          onDeleted={onDeleted}
          onToggleDone={() => onToggleDone(item.id)} //подобрать id
          data={data}
          item={item}
          onSubmit={onSubmit}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}

TaskList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  data: PropTypes.number.isRequired,
};

TaskList.defaultProps = {
  onDeleted() {},
  onToggleDone() {},
};
