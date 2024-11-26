import React from 'react';
import { createRoot } from 'react-dom/client';
import AcUnitIcon from '@mui/icons-material/AcUnit';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
