import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BasketProvider } from './context/BasketContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BasketProvider>
        <App />
      </BasketProvider>
    </ThemeProvider>
  </React.StrictMode>
);
