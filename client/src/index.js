import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/store/index.js';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

//le indicamos al REACTDOM que queremos que renderice(APP) y en donde(en ROOT del html de public)
//el provider lo importamos y lo ponemos para que 'envuelva' toda la app, 
//permite que todos los componentes de la app tengan acceso al store de redux


ReactDOM.render(
    <Provider store={store}> 
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
