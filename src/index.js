import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'element-theme-default';
import ApplicationRouter from './router/index'
import {Provider} from 'react-redux'
import store from './redux/store'
import {persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
let persistor = persistStore(store)
const rootElement = document.getElementById('root')
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
    <ApplicationRouter />
    </Provider>
  </HashRouter>,
  rootElement
);
