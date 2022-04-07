import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'element-theme-default';
import ApplicationRouter from './router/index'
ReactDOM.render(
  <HashRouter>
    <ApplicationRouter />
  </HashRouter>,
  document.getElementById('root')
);
