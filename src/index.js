import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConfigProvider  } from 'antd'
import zhCN from 'antd/es/locale-provider/zh_CN';
import * as serviceWorker from './serviceWorker';

//将app组件渲染到index页面的div标签上
ReactDOM.render(
    <ConfigProvider  locale={zhCN}><App /></ConfigProvider >,
  document.getElementById('root')
);
serviceWorker.unregister();