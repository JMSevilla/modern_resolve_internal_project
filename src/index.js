import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'element-theme-default';
import ApplicationRouter from './router/index'
import {Provider} from 'react-redux'
import store from './redux/store'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
    <ApplicationRouter />
    </Provider>
  </HashRouter>,
  rootElement
);
