import React from 'react';
import { formatDistanceToNow, min } from 'date-fns';
import Countdown from 'react-countdown';
import PropTypes from 'prop-types';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.minutes = '';
    this.seconds = '';
    this.ref = React.createRef();
    this.countDown = Date.now() + this.props.time;

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

  render() {
    const { onDeleted, onToggleDone, item, changeText } = this.props;
    const { isEdit, data, label } = this.state;
    const result = formatDistanceToNow(data, { includeSeconds: true });
    const Completionist = () => <span>Finish!</span>;
    const { id } = item;
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
            onChange={() => onToggleDone(id)}
          />
          <label onClick={() => onToggleDone(id)}>
            <span className="description">{item.text}</span>
            <span className="created">
              <button className="icon icon-play" onClick={this.handleStart}></button>
              <button className="icon icon-pause" onClick={this.handleStop}></button>
              <Countdown
                date={this.countDown}
                zeroPadTime={1}
                daysInHours={true}
                autoStart={false}
                ref={this.ref}
                renderer={({ minutes, seconds, completed }) => {
                  if (completed) {
                    return <Completionist />;
                  } else {
                    this.minutes = minutes;
                    this.seconds = seconds;
                    return (
                      <span>
                        {minutes}: {seconds}
                      </span>
                    );
                  }
                }}
              ></Countdown>
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
