import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,  } from 'react-router-dom';
import axios, {  } from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider } from './features/context/StoreProvider';
import { Provider } from 'react-redux';
import { store } from './store';



axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <StoreProvider>
      <App />
      </StoreProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
