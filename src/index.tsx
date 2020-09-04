
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { init } from '@rematch/core'
import { Provider } from 'react-redux'
import * as models from './models/index'
import './index.scss'

const store = init({ models })
console.log(process.env.ENV_INFO)
const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
ReactDom.render(<Root />, document.getElementById('root'))
