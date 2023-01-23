import React from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../newTaskForm';

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onItemAdded={this.props.onItemAdded} />
      </header>
    );
  }
}

AppHeader.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

AppHeader.defaultProps = {
  onItemAdded() {},
};
