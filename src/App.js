import React, {Component} from 'react';
import './App.css';
import './configs/config'
import {HashRouter ,Route,Switch} from "react-router-dom";




/*
* 将组件你映射成路由
*/
import Login from "./pages/login/index"
import Admin from "./pages/admin/index";
/*
* 应用的根组件
* */
export default class App extends Component{
  render() {
    return (
        <HashRouter>
          <Switch>{/*只匹配一个*/}
              <Route exact strict path="/login" component={Login} />
              <Route exact strict path="/" component={Admin} />
          </Switch>
        </HashRouter>
    );
  }


}

