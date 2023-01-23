import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Main from '../main';
import AppHeader from '../app-header';
import Footer from '../footer';

export default class App extends React.Component {
  state = {
    filter: 'all',
    todoData: [],
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

  changeText = (id, value, event) => {
    event.preventDefault();
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

  clearCompleted = () => {
    this.state.todoData.filter((elem) => {
      if (elem.done) {
        this.deleteItem(elem.id);
      }
    });
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
      <div>
        <AppHeader onItemAdded={this.addItem} />
        <Main
          todos={todoItemsShown}
          onDeleted={(id) => this.deleteItem(id)}
          onToggleDone={this.onToggleDone}
          changeText={(id, value, event) => this.changeText(id, value, event)}
        />
        <Footer
          todo={todoCount}
          changeFilter={this.changeFilter}
          clearCompleted={this.clearCompleted}
          filter={filter}
        />
      </div>
    );
  }
}
