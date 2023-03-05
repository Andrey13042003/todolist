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
    let minValue = Number(e.target.value);
    minValue && minValue < 60 ? this.setState({ min: minValue }) : this.setState({ min: '' });
  };

  onSecondChange = (e) => {
    let secValue = Number(e.target.value);
    secValue && secValue < 60 ? this.setState({ sec: secValue }) : this.setState({ sec: '' });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (/\S/.test(this.state.label)) {
      let time = this.state.min * 60 + this.state.sec;
      this.props.onItemAdded(this.state.label, time);
    }
    this.setState({ label: '', min: '', sec: '' });
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
