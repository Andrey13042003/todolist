import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Main from '../main';
import AppHeader from '../app-header';
import Footer from '../footer';

//При изменении target могут произойти непредвиденные изменения
//Интерпретатор встречает таски с одинаковыми ключами только в случае, если у тасок указан таймер
export const App = () => {
  const [filter, setFilter] = useState('all');
  const [todoData, setToDoData] = useState([]);
  const [target, setTarget] = useState('');

  const onToggleDone = (id, e) => {
    setTarget(e.target);
    setToDoData(toggleProperty(todoData, id, 'done'));
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const changeFilter = (name) => setFilter(name);

  const addItem = (text, time) => setToDoData((todoData) => [...todoData, createTodoItem(text, time)]);

  const deleteItem = (id) => {
    setToDoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);
      return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    });
  };

  const createTodoItem = (text, time) => {
    return {
      text,
      done: false,
      id: uuidv4(),
      time: time,
      timerActive: false,
    };
  };

  const tick = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    if (oldItem.time > 0) {
      setToDoData((todoData) => {
        const count = oldItem.time;
        const newItem = { ...oldItem, time: count - 1 };

        return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      });
    }
  };

  const onClickPlay = (id, e) => {
    e.stopPropagation();
    if (!target) {
      setToDoData((todoData) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = { ...oldItem, timerActive: true };
        return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      });
    }
    setTarget('');
  };

  const onClickPaused = (id, e) => {
    e.stopPropagation();
    setToDoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, timerActive: false };
      return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    });
  };

  const allPaused = () => {
    setToDoData((todoData) => {
      return todoData.map((el) => {
        return { ...el, timerActive: false };
      });
    });
  };

  const changeText = (id, value) => {
    setToDoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldElement = todoData[idx];
      oldElement.text = value;
      return [...todoData.slice(0, idx), oldElement, ...todoData.slice(idx + 1)];
    });
  };

  const clearCompleted = () => {
    let isNotDone = todoData.filter((el) => !el.done);
    setToDoData(isNotDone);
  };

  const todoCount = todoData.filter((el) => !el.done).length;
  let todoItemsShown;

  switch (filter) {
  case 'completed':
    todoItemsShown = todoData.filter((el) => el.done);
    break;
  case 'active':
    todoItemsShown = todoData.filter((el) => !el.done);
    break;
  case 'all':
    todoItemsShown = todoData;
  }

  return (
    <>
      <AppHeader onItemAdded={addItem} />
      <Main
        todos={todoItemsShown}
        onDeleted={(id) => deleteItem(id)}
        onToggleDone={(id, e) => onToggleDone(id, e)}
        changeText={(id, value) => changeText(id, value)}
        filter={filter}
        tick={(id) => tick(id)}
        onClickPaused={(id, e) => onClickPaused(id, e)}
        onClickPlay={(id, e) => onClickPlay(id, e)}
      />
      <Footer
        todo={todoCount}
        changeFilter={changeFilter}
        allPaused={allPaused}
        clearCompleted={clearCompleted}
        filter={filter}
      />
    </>
  );
};
