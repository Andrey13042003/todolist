import React from 'react';
import PropTypes from 'prop-types';

import './newTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onMinuteChange = (e) => {
    this.setState({ min: e.target.value });
  };

  onSecondChange = (e) => {
    this.setState({ sec: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (/\S/.test(this.state.label)) {
      this.props.onItemAdded(this.state.label);
      if (!this.state.min && !this.state.sec) {
        this.props.getTime(1, 30);
      } else {
        this.props.getTime(this.state.min, this.state.sec);
      }
    }
    this.setState({ label: '' });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="search_form">
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
          autoFocus
        />
        <input type="submit" className="submit" />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.state.min}
          onChange={this.onMinuteChange}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.state.sec}
          onChange={this.onSecondChange}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  onItemAdded() {},
};
