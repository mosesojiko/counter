import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import './index.css';
import './moses.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
//import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from './context/ChatProvider';


ReactDOM.render(
  <Provider store={store}>
    <ChatProvider>
      {/* <ChakraProvider></ChakraProvider> */}
      <App />
    </ChatProvider>
    ,
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
