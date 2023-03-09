import './index.css';
import ReactDOM from 'react-dom/client';

import App from './components/app';

function ToDoApp() {
  return <App />;
}

const root = ReactDOM.createRoot(document.querySelector('.todoapp'));
root.render(<ToDoApp />);
