import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import CountDown from '../count-down';

export const Task = ({ onDeleted, onToggleDone, item, changeText, tick, onClickPaused, onClickPlay }) => {
  const [isEdit, setEdit] = useState(false);
  const [label, setLabel] = useState(item.text);
  const [data] = useState(new Date());

  const isEditing = () => !item.done && setEdit(true);

  const onLabelChange = (e) => setLabel(e.target.value);

  const onFormSubmit = (e) => {
    e.preventDefault();
    changeText(item.id, label);
    setEdit(false);
  };

  const { id } = item;

  const result = formatDistanceToNow(data, { includeSeconds: true });

  return (
    <li
      key={id}
      className={(isEdit === true && 'editing') || (item.done && 'completed') || (!isEdit && !item.done && '')}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={(!isEdit && !item.done && '') || (item.done && 'checked')}
          onChange={(e) => onToggleDone(id, e)}
        />
        <label onClick={(e) => onToggleDone(id, e)}>
          <span className="description">{item.text}</span>
          <span className="created">
            <button className="icon icon-play" onClick={(e) => onClickPlay(id, e)}></button>
            <button className="icon icon-pause" onClick={(e) => onClickPaused(id, e)}></button>
            <CountDown time={item.time} tick={tick} id={id} timerActive={item.timerActive} />
          </span>
          <span className="created">created {result}</span>
        </label>
        <button className="icon icon-edit" onClick={isEditing} />
        <button className="icon icon-destroy" onClick={() => onDeleted(id)} />
      </div>
      <form onSubmit={onFormSubmit}>
        <input id={item.id} type="text" className="edit" onChange={onLabelChange} value={label} autoFocus />
      </form>
    </li>
  );
};

Task.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  changeText: PropTypes.func.isRequired,
};

Task.defaultProps = {
  onDeleted() {},
  onToggleDone() {},
  item: {},
  changeText() {},
};
