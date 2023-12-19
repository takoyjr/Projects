import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { json } from 'stream/consumers';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
