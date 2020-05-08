import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConfigProvider  } from 'antd'
import zhCN from 'antd/es/locale-provider/zh_CN';
import * as serviceWorker from './serviceWorker';
import mememoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';

//将store中的值读取到内存中
const user = storageUtils.getUser();
mememoryUtils.user = user ;

//将app组件渲染到index页面的div标签上
ReactDOM.render(
    <ConfigProvider  locale={zhCN}><App /></ConfigProvider >,
  document.getElementById('root')
);
serviceWorker.unregister();