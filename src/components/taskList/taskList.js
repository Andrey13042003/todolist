import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';

export default class TaskList extends React.Component {
  render() {
    const { todos, onDeleted, onToggleDone, changeText, changeTodoItemTime, filter } = this.props;
    const elements = todos.map((item) => {
      return (
        <Task
          key={item.id}
          onDeleted={onDeleted}
          onToggleDone={() => onToggleDone(item.id)}
          item={item}
          changeText={changeText}
          changeTodoItemTime={changeTodoItemTime}
          filter={filter}
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
  changeText: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  onDeleted() {},
  onToggleDone() {},
  changeText() {},
};
