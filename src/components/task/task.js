import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
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
    const { onDeleted, onToggleDone, item, changeText } = this.props;
    const { isEdit, data, label } = this.state;
    const result = formatDistanceToNow(data, { includeSeconds: true });

    const { id } = item;
    const self = this;
    let ch = '';
    let classNames = '';

    if (!isEdit || !item.done) {
      classNames = '';
      ch = '';
    }

    if (isEdit) {
      classNames += 'editing';
    }

    if (item.done) {
      classNames += 'completed';
      ch = 'checked';
    }

    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={ch} onChange={() => onToggleDone(id)} />
          <label onClick={() => onToggleDone(id)}>
            <span className="description">{item.text}</span>
            <span className="created">created {result}</span>
          </label>
          <button className="icon icon-edit" onClick={this.isEditing} />
          <button className="icon icon-destroy" onClick={() => onDeleted(id)} />
        </div>
        <form
          onSubmit={function (event) {
            changeText(item.id, self.state.label, event);
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
};

Task.defaultProps = {
  onDeleted() {},
  onToggleDone() {},
};
