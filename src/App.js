import React, {Component} from 'react';
import './App.css';
import './configs/config'
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";




/*
* 将组件你映射成路由
*/
import Login from "./pages/login/index"
import Admin from "./pages/admin/index";
import ForgetPassword from "./pages/login/forgetpassword";
import Register from "./pages/login/register";
/*
* 应用的根组件
* */
export default class App extends Component{
  render() {
    return (
        <HashRouter>
          <Switch>{/*只匹配一个*/}
              <Route  path="/login" component={Login} />
              <Route  path="/sys" component={Admin} />
              <Route  path="/forgetPassword" component={ForgetPassword} />
              <Route  path="/register" component={Register} />
              <Redirect to='/login'/>
          </Switch>
        </HashRouter>
    );
  }


}

