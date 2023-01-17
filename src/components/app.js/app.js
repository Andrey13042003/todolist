import React from 'react';

import Main from '../main';
import AppHeader from '../app-header';
import Footer from '../footer';

import './app.css';

export default class App extends React.Component {
  maxid = 1;

  state = {
    filter: 'all',
    todoData: [],
    date: 0,
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
      let newData = Date.now();

      return {
        todoData: newArr,
        date: newData,
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

  //менять текст после нажатия на enter
  createTodoItem(text) {
    return {
      text,
      done: false,
      id: this.maxid++,
    };
  }

  onSubmit = (id, value, event) => {
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

  render() {
    const doneCount = this.state.todoData.filter((element) => element.done).length;
    const todoCount = this.state.todoData.length - doneCount;
    let todoItemsShown;

    switch (this.state.filter) {
    case 'completed':
      todoItemsShown = this.state.todoData.filter((elem) => elem.done);
      break;
    case 'active':
      todoItemsShown = this.state.todoData.filter((elem) => !elem.done);
      break;
    case 'clear completed':
      todoItemsShown = this.state.todoData.filter((elem) => {
        if (elem.done) {
          setTimeout(() => {
            this.deleteItem(elem.id);
          });
        }
      });
      break;
    default:
      todoItemsShown = this.state.todoData;
    }

    return (
      <div>
        <AppHeader onItemAdded={this.addItem} />
        <Main
          todos={todoItemsShown}
          onDeleted={(id) => this.deleteItem(id)}
          onToggleDone={this.onToggleDone}
          data={this.state.date}
          onSubmit={(id, value, event) => this.onSubmit(id, value, event)}
        />
        <Footer todo={todoCount} done={doneCount} changeFilter={this.changeFilter} />
      </div>
    );
  }
}
