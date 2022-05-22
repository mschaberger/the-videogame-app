import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer/index.js';
import thunk from 'redux-thunk'; //es un middleware para trabajar con las action creators asincrónicas(que hacen pedidos al back/api-BD)

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(thunk)) //para que funcione la extension de redux del browser
);

export default store;