import React from 'react';
import ReactDOM from 'react-dom';
import {HandlesContext} from './redux/core/context/base/FieldContext'
import {FieldContext} from './redux/core/context/context'
import { HandleFetch } from './redux/core/context/base/FetchContext';
import {HashRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'element-theme-default';
import ApplicationRouter from './router/index'
import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'
const rootElement = document.getElementById('root')

const store = configureStore()

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <HandlesContext>
        <FieldContext>
          <HandleFetch>
          <ApplicationRouter />
          </HandleFetch>
        </FieldContext>
      </HandlesContext>
    </Provider>
  </HashRouter>,
  rootElement
);
