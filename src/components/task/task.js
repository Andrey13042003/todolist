import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './task.css';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      label: this.props.item.text,
      checked: '',
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

  isChecked = () => {
    if (this.state.checked == '') {
      this.setState({
        checked: 'checked',
      });
    }
    else {
      this.setState({
        checked: '',
      });
    }
  };

  render() {
    const { onDeleted, onToggleDone, data, item, onSubmit } = this.props;
    const result = formatDistanceToNow(data, { includeSeconds: true });

    const { id } = item;
    const self = this;
    let classNames = '';

    if (!this.state.isEdit || !item.done) {
      classNames = '';
    }

    if (this.state.isEdit) {
      classNames += 'editing';
    }

    if (item.done) {
      classNames += 'completed';
    }

    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.state.checked}
            onChange={function () {
              onToggleDone(id);
              self.isChecked();
            }}
          />
          <label
            onClick={function () {
              onToggleDone(id);
              self.isChecked();
            }}
          >
            <span className="description">{item.text}</span>
            <span className="created">created {result}</span>
          </label>
          <button className="icon icon-edit" onClick={this.isEditing} />
          <button className="icon icon-destroy" onClick={() => onDeleted(id)} />
        </div>
        <form
          onSubmit={function (event) {
            onSubmit(item.id, self.state.label, event);
            self.isFalse();
          }}
        >
          <input
            id={item.id}
            type="text"
            className="edit"
            onChange={this.onLabelChange}
            value={this.state.label}
            autoFocus
          />
        </form>
      </li>
    );
  }
}

Task.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  data: PropTypes.number.isRequired,
};

Task.defaultProps = {
  onDeleted() {},
  onToggleDone() {},
};
