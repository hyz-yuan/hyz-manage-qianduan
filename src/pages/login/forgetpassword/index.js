import React, {Component} from 'react'
import Background from '../../../assets/images/login.jpg';
import LoginCompany from '../../../assets/images/loginCompany.png';
import LoginUsername from '../../../assets/images/loginUsername.png';
import LoginPassword from '../../../assets/images/loginPassword.png';

import './index.css'
import {fetchPost} from "../../../utils/fetch";
import { Button, Input, Col, message } from 'antd';
import {createHashHistory} from "history";

class ForgetPassword extends Component {
    state = {
        hasChoose: false,
        email: '',
        password: '',
        userName: '',
        saveEmail: '',
        savePassword: '',
        saveUserName: '',
        myVerification: '',
        verification: '',
    };

    //

    handleemail = (e) => {
        let value = e.target.value.replace(/[\u4e00-\u9fa5]/g, '');
        this.setState({
            email: value || '',
        })
    };

    handlePassword = (e) => {
        let value = e.target.value.replace(/[\u4e00-\u9fa5]/g, '');
        this.setState({
            password: value || '',
        })
    };


    handleVerification = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        this.setState({
            verification: value || '',
        })
    };

    handleName = (e) => {
        this.setState({
            userName: e.target.value || '',
        })
    };


    //发送验证码
    handleSendPhoneMsg = () => {
        const {userName,password,email} = this.state;
        if(! userName || userName.length===0){
            message.error('请输入用户名');
            return ;
        }else if(!password || password.length===0){
            message.error('请输入新密码');
            return ;
        }else if(!email || email.length===0){
            message.error('请输入邮箱');
            return ;
        }
        let params = {
            userName: userName,
            password: password,
            email: email,
        };
        // fetchPost('http://localhost:7080/pages/web/sendCode', params)
        fetchPost(global.constants.sendCode, params)
            .then(
                res => {
                    switch (res) {

                        case "请输入正确的用户名":
                            message.error("请输入正确的用户名");
                            break;
                        case "请输入不同的密码":
                            message.error("请输入不同的密码");
                            break;
                        case "邮箱错误":
                            message.error("邮箱错误");
                            break;
                        default:
                            if(res.length===6 && /[0-9]/g.test(res)){
                                this.setState({
                                    myVerification : res,
                                    saveEmail: email,
                                    savePassword: password,
                                    saveUserName: userName,
                                });
                                message.success('发送成功');
                            }else{
                                message.info("未知错误");
                            }
                            break;

                    }
                }
            )
            .catch(e => console.log(e))
    };


    //重置密码
    resetPassword = () => {
        const {userName,password,email,saveEmail,savePassword,saveUserName} = this.state;
        if( userName!==saveUserName) {
            message.info("用户名更改,请从新发送验证码");
            return ;
        }else if( password!==savePassword){
            message.info("密码更改,请从新发送验证码");
            return ;
        }else if( email!=saveEmail){
            message.info("邮箱已更改,请从新发送验证码");
            return ;
        }else if(saveUserName.length===0 ||savePassword.length===0 ||saveEmail.length===0 ){
            message.info("请发送验证码");
            return ;
        }
        let params = {
            userName: userName,
            password: password,
        };
        // fetchPost('http://localhost:7080/pages/web/codeMaching', params)
        fetchPost(global.constants.passwordUpdate, params)
            .then(
                res => {
                    switch (res) {
                        case '修改成功':
                            message.info('修改成功');
                            createHashHistory().push('/');
                            break;
                        case '修改失败':
                            message.info('修改失败');
                            break;
                        default:
                            message.info("未知错误");
                            break
                    }
                }
            )
            .catch(e => console.log(e))
    };

    render() {
        const {email, password, name, verification} = this.state;
        return (
            <div className='forgetPassword' style={{backgroundImage: `url("${Background}")`}}>
                <div className="login">
                    <div className="title">注册邮箱密码找回</div>
                    <div className="line">
                        <img className="smallImg" src={LoginCompany} alt={'name'}/>
                        <input placeholder="请输入用户名" value={name} type="text" onChange={this.handleName}/>
                    </div>

                    <div className="line">
                        <img className="smallImg" src={LoginPassword} alt={'password'}/>
                        <input placeholder="请输入新密码" value={password} type="password" onChange={this.handlePassword}/>
                    </div>

                    <div className="line">
                        <img className="smallImg" src={LoginUsername} alt={'email'}/>
                        <input placeholder="请输入注册邮箱" value={email} type="text" onChange={this.handleemail}/>
                    </div>

                    <div className="verification">
                        <Col span={23}>
                            <Input placeholder={'请输入验证码'} style={{width:'60%',float:'left'}}  value={verification} onChange={this.handleVerification}/>
                            {/*<Button style={{width:'30%',float:'right'}} >test</Button>*/}
                            <Button style={{width:'35%',float:'right'}} type="primary" onClick={this.handleSendPhoneMsg}>获取验证码</Button>
                        </Col>
                        <Col span={2}/>
                        {/*<Col span={6}><Button style={{float:'right'}} type="primary" onClick={this.handleSendPhoneMsg}>获取验证码</Button></Col>*/}
                    </div>
                    {/*}*/}
                    <button type="button" className="logBut" onClick={this.resetPassword}>重&nbsp;&nbsp;置</button>
                </div>
            </div>
        );
    }
}

export default ForgetPassword