import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer/index.js';
import thunk from 'redux-thunk';

//insitalamos redux
const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;