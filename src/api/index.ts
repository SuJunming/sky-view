import Api from './api'
import { request, axios } from './request'
import { createBrowserHistory } from 'history'
import { message } from 'antd'

const history = createBrowserHistory()
export { request, Api, axios, history, message }
