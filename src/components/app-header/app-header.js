import React from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../newTaskForm';

export const AppHeader = ({ onItemAdded }) => {
  return (
    <header className="header">
      <h1>Todos</h1>
      <NewTaskForm onItemAdded={onItemAdded} />
    </header>
  );
};

AppHeader.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

AppHeader.defaultProps = {
  onItemAdded() {},
};
