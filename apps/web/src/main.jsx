import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import {Toaster} from 'react-hot-toast'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider >
          <App />
          <Toaster/>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
