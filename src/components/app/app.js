import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Main from '../main';
import AppHeader from '../app-header';
import Footer from '../footer';

export default class App extends React.Component {
  state = {
    filter: 'all',
    todoData: [],
    time: '',
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'done'),
    }));
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  changeFilter = (name) => {
    this.setState(() => {
      return {
        filter: name,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  createTodoItem(text) {
    return {
      text,
      done: false,
      id: uuidv4(),
    };
  }

  changeText = (id, value) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldElement = todoData[idx];
      oldElement.text = value; //убрать пробелы
      const newArray = [...todoData.slice(0, idx), oldElement, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  getTime = (min, sec) => {
    this.setState(() => ({ time: min * 60 * 1000 + sec * 1000 }));
  };

  clearCompleted = () => {
    let isNotDone = this.state.todoData.filter((el) => !el.done);
    this.setState(() => ({ todoData: isNotDone }));
  };

  render() {
    const { filter, todoData } = this.state;
    const todoCount = todoData.filter((element) => !element.done).length;
    let todoItemsShown;

    switch (filter) {
    case 'completed':
      todoItemsShown = todoData.filter((elem) => elem.done);
      break;
    case 'active':
      todoItemsShown = todoData.filter((elem) => !elem.done);
      break;
    case 'all':
      todoItemsShown = todoData;
    }

    return (
      <>
        <AppHeader onItemAdded={this.addItem} getTime={this.getTime} />
        <Main
          todos={todoItemsShown}
          onDeleted={(id) => this.deleteItem(id)}
          onToggleDone={this.onToggleDone}
          changeText={(id, value) => this.changeText(id, value)}
          time={this.state.time}
        />
        <Footer
          todo={todoCount}
          changeFilter={this.changeFilter}
          clearCompleted={this.clearCompleted}
          filter={filter}
        />
      </>
    );
  }
}
