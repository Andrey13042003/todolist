import React from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.currentTarget.value = '';
    if (/\S/.test(this.state.label)) {
      this.props.onItemAdded(this.state.label);
    }
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
          autoFocus
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
