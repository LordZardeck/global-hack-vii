import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';
import * as serviceWorker from './serviceWorker';
import App from "./App";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
