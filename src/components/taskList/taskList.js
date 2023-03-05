import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';

export default class TaskList extends React.Component {
  render() {
    const { todos, onDeleted, onToggleDone, changeText, filter, tick, onClickPaused, onClickPlay } = this.props;
    let elements = todos.map((item) => {
      return (
        <Task
          key={item.id}
          onDeleted={onDeleted}
          onToggleDone={onToggleDone}
          item={item}
          changeText={changeText}
          filter={filter}
          tick={tick}
          onClickPaused={onClickPaused}
          onClickPlay={onClickPlay}
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
