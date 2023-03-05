import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import CountDown from '../count-down';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();

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

  render() {
    const { onDeleted, onToggleDone, item, changeText, filter, tick, onClickPaused, onClickPlay } = this.props;

    const { isEdit, data, label } = this.state;
    const { id } = item;

    const result = formatDistanceToNow(data, { includeSeconds: true });
    const self = this;

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
