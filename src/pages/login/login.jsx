import React, {Component} from 'react'
import Background from './images/login.jpg';
import LoginUsername from './images/loginUsername.png';
import LoginPassword from './images/loginPassword.png';
import './login.css'
import {createHashHistory} from "history";
import {fetchPost} from "../../utils/fetch";
import {message} from "antd";


class Login extends Component {
    state = {
        username: '',
        password: '',
        errMsg: '',
    }

    handleUsername = (e) => {
        let value = e.target.value.replace(/[\u4e00-\u9fa5]/g, '')
        this.setState({
            username: value
        })
    }
// \u4e00和\u9fa5是unicode编码，并且正好是中文编码的开始和结束的两个值，所以这个正则表达式可以用来判断字符串中是否包含中文。
// /g意思就是：global可选标志，带这个标志表示替换将针对行中每个匹配的串进行，否则则只替换行中第一个匹配串。如：we.fdffddfwe.加上/g后，则2个we都会出来。

    handlePassword = (e) => {
        let value = e.target.value.replace(/[\u4e00-\u9fa5]/g, '')
        this.setState({
            password: value
        })
    }

    handleLogin = () => {
        let params = {
            loginName: this.state.username,
            password: this.state.password
        }

        // eslint-disable-next-line no-undef
        // fetchPost('http://localhost:9080/pages/web/login', params)
        fetchPost(global.constants.login,params)
            .then(
                res => {
                    if(res.errCode===20002)message.info("请输入正确的帐号或密码")
                    else if(res.errCode===20001) message.info("账号不存在")
                    else if(res.errCode===10002) message.info("未知错误")
                    else
                        /*createHashHistory().push('/sys/organizationChart');*/
                    createHashHistory().push('/');
                    // res.userType?createHashHistory().push('/sys/projectList'):createHashHistory().push('/sys/home')
                    // if(res.userType==1)createHashHistory().push('/sys/projectList');
                    // else if(res.userType==2)createHashHistory().push('/sys/projectList');
                    // else if(res.userType==3)createHashHistory().push('/sys/projectList');
                }

            )
            .catch(e => console.log(e))
    }

    forgetPassword = () => {
        createHashHistory().push('/forgetPassword')

    }

    register = () =>{
        createHashHistory().push('/register')
    }

    render() {
        const {username, password, errMsg} = this.state
        return (

            <div className='loginPage' style={{backgroundImage: `url("${Background}")`}}>

                <div className="login">
                    <div className="title">智能</div>
                    <div className="title1">项目管理系统</div>
                    <div className="line">
                        <img className="smallImg" src={LoginUsername} alt={'username'}/>
                        <input placeholder="请输入账号" value={username} type="text" onChange={this.handleUsername}/>
                    </div>
                    <div className="line">
                        <img className="smallImg" src={LoginPassword} alt={'password'}/>
                        <input placeholder="请输入密码" value={password} type="password" onChange={this.handlePassword}/>
                    </div>
                    <div className='errMsg'>{errMsg}</div>
                    <button type="button" className="logBut" onClick={this.handleLogin}>登&nbsp;&nbsp;录</button>
                    <div className='registerBox' onClick={this.forgetPassword}>
                        忘记密码?
                    </div>

                    <div className='registerBox2' onClick={this.register}>
                        注册
                    </div>

                </div>
            </div>
        );
    }
}

export default Login
