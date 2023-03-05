import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Main from '../main';
import AppHeader from '../app-header';
import Footer from '../footer';

export default class App extends React.Component {
  target = '';
  state = {
    filter: 'all',
    todoData: [],
  };

  onToggleDone = (id, e) => {
    this.target = e.target;
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

  changeFilter = (name) => this.setState(() => ({ filter: name }));

  addItem = (text, time) => {
    const newItem = this.createTodoItem(text, time);
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

  createTodoItem(text, time) {
    return {
      text,
      done: false,
      id: uuidv4(),
      time: time,
      timerActive: false,
    };
  }

  tick = (id) => {
    const { todoData } = this.state;
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];

    if (oldItem.time > 0) {
      this.setState(({ todoData }) => {
        const count = oldItem.time;
        const newItem = { ...oldItem, time: count - 1 };
        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
        return {
          todoData: newArray,
        };
      });
    }
  };

  onClickPlay = (id, e) => {
    e.stopPropagation();
    if (!this.target) {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = { ...oldItem, timerActive: true };
  
        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
  
        return {
          todoData: newArray,
        };
      });
    }
    this.target = '';
  };

  onClickPaused = (id, e) => {
    e.stopPropagation();
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, timerActive: false };

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  allPaused = () => {
    this.setState(({ todoData }) => {
      const newData = todoData;
      const elements = newData.map((el) => {
        return { ...el, timerActive: false };
      });

      return {
        todoData: elements,
      };
    });
  };

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
        <AppHeader onItemAdded={this.addItem} />
        <Main
          todos={todoItemsShown}
          onDeleted={(id) => this.deleteItem(id)}
          onToggleDone={(id, e) => this.onToggleDone(id, e)}
          changeText={(id, value) => this.changeText(id, value)}
          filter={filter}
          tick={(id) => this.tick(id)}
          onClickPaused={(id, e) => this.onClickPaused(id, e)}
          onClickPlay={(id, e) => this.onClickPlay(id, e)}
        />
        <Footer
          todo={todoCount}
          changeFilter={this.changeFilter}
          allPaused={this.allPaused}
          clearCompleted={this.clearCompleted}
          filter={filter}
        />
      </>
    );
  }
}
