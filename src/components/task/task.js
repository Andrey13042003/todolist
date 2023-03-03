import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import CountDown from '../count-down';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.minutes = 0;
    this.seconds = 0;
    this.ref = React.createRef();
    this.countDown = Date.now() + this.props.item.time;

    this.state = {
      isEdit: false,
      label: this.props.item.text,
      data: new Date(),
    };
  }

  isEditing = () => {
    if (!this.props.item.done) {
      this.setState({
        isEdit: true,
      });
    }
  };

  isFalse = () => {
    this.setState({
      isEdit: false,
    });
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  handleStart = (e) => {
    e.stopPropagation();
    return this.ref.current.start();
  };

  handleStop = (e) => {
    e.stopPropagation();
    this.countDown = Date.now() + (this.minutes * 60 * 1000 + this.seconds * 1000);
    return this.ref.current.pause();
  };

  changeTime = (min, sec) => {
    if (typeof min != 'string' && typeof sec != 'string') {
      this.minutes = min;
      this.seconds = sec;
      //сохранять время по id в app в todoData
      this.props.changeTodoItemTime(min, sec, this.props.item.id);
    }
  };

  render() {
    const { onDeleted, onToggleDone, item, changeText } = this.props;

    const { isEdit, data, label } = this.state;
    const { id } = item;

    const result = formatDistanceToNow(data, { includeSeconds: true });
    const self = this;
    let link = this.ref;

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
            onChange={() => onToggleDone(id)}
          />
          <label onClick={() => onToggleDone(id)}> {/* Important */}
            <span className="description">{item.text}</span>
            <span className="created">
              <button className="icon icon-play" onClick={this.handleStart}></button>
              <button className="icon icon-pause" onClick={this.handleStop}></button>
              <CountDown countDown={this.countDown} link={link} changeTime={this.changeTime} /> 
            </span>
            <span className="created">created {result}</span>
          </label>
          <button className="icon icon-edit" onClick={this.isEditing} />
          <button className="icon icon-destroy" onClick={() => onDeleted(id)} />
        </div>
        <form
          onSubmit={function (e) {
            e.preventDefault();
            changeText(item.id, self.state.label);
            self.isFalse();
          }}
        >
          <input id={item.id} type="text" className="edit" onChange={this.onLabelChange} value={label} autoFocus />
        </form>
      </li>
    );
  }
}

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
