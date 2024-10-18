import React from 'react';
import { createRoot } from 'react-dom/client'; // Atualize aqui
import App from './App';
import './index.css'; // Se você criou um arquivo de estilos

const container = document.getElementById('root');
const root = createRoot(container); // Use createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
