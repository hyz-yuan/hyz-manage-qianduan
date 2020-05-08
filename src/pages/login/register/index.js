import React, {Component} from 'react'
import Background from '../../../assets/images/login.jpg';
import LoginCompany from '../../../assets/images/loginCompany.png';
import LoginUsername from '../../../assets/images/loginUsername.png';
import LoginPassword from '../../../assets/images/loginPassword.png';

import './index.css'
import {fetchPost} from "../../../utils/fetch";
import {  message,Select } from 'antd';
import {createHashHistory} from "history";

export default class Register extends Component {
    state = {
        hasChoose: false,
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        realName: '',
        verification: '',
        messagePassword: '',
        message: '',
        workplace:[],
        technology:[],
        workplaceId: 0,
        technologyId: 0,
        tips: '',
    };
    componentDidMount() {

        fetchPost(global.constants.selectWorkPlace, {})
            .then(
                res => this.setWorkplace(res)
            )
            .catch(e => console.log(e));

        fetchPost(global.constants.technologySelect, {})
            .then(
                res => this.setTechnology(res)
            )
            .catch(e => console.log(e))
    }
    setWorkplace = (list) => {
        this.setState({
            workplace: list.map((item, index) => {
                return (<Select value={item.id} selected>{item.workPlace}</Select>)
            })
        })
    };
    setTechnology = (list) => {
        this.setState({
            technology: list.map((item, index) => {
                return (<Select value={item.id} selected>{item.pId===0?item.technologyName:"+--"+item.technologyName}</Select>)
            })
        })
    };
    handleemail = (e) => {
        let value = e.target.value.replace(/[\u4e00-\u9fa5]/g, '');
        this.setState({
            email: value
        })
    };
    handlePassword = (e) => {
        let value = e.target.value.replace(/[\u4e00-\u9fa5]/g, '');
        this.setState({
            password: value
        })
    };
    handlePassword2 = (e) => {
        let value = e.target.value.replace(/[\u4e00-\u9fa5]/g, '');
        this.setState({
            confirmPassword: value
        })
    };

    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    };
    handleRealName = (e) => {
        this.setState({
            realName: e.target.value
        })
    };

    //判断用户名是否存在
    inputOnBlur = (e) =>{
        let params = {userName:e.target.value};
        let n=e.target.value;
        fetchPost(global.constants.selectUsername,
            params
        ).then(
                res => {
                    if(res==="用户名已存在"){this.setState({message:n+res,name:""})}


                }

            ).catch(e => console.log(e))


    };
    //判断密码是否一致
    handleConfirm = (e) =>{

        let messagePassword = '';
        const {password,confirmPassword} = this.state;
        if(password!==confirmPassword){
            messagePassword = '两次密码输入不一致'
        }else {
            messagePassword = ''
        }
        this.setState({
            messagePassword,
        })
    };
    //获取工作地点ID
    selectWorkPlaceId = (value) =>{
        this.setState({workplaceId:value})
    };
    //获取工作领域ID
    selectTechnologyId = (value) =>{
        this.setState({technologyId:value})
    };
    //注册
    handleRegister = () =>{
        let tips = '';
        const {email, password, name, realName, technologyId, workplaceId, message, confirmPassword,} = this.state;
       if(name===''){tips = '用户名不能为空'}
       else if(password===''){tips = '密码不能为空'}
       else if(confirmPassword===''){tips = '确认密码不能为空'}
       else if(realName===''){tips = '真实姓名不能为空'}
       else if(workplaceId===[]){tips = '工作地点不能为空'}
       else if(technologyId===[]){tips = '技术领域不能为空'}
       else if(email===''){tips = '邮箱不能为空'}
       else if(password!==confirmPassword){tips = ''}
       else if(message!==''){tips = ''}
       else{
           fetchPost(global.constants.insertUser, {
               userName: name,
               password: password,
               realName: realName,
               workPlace: workplaceId,
               technology: technologyId,
               email: email
           })
               .then(
                   res => {
                       alert(res);
                       if(res==='注册成功'){
                           createHashHistory().push('/login')
                       }
                   }
               )
               .catch(e => console.log(e))
       }
       this.setState({tips});
    };






    render() {
        const {email, password, name, message, realName, confirmPassword, messagePassword, tips} = this.state;

        return (
            <div className='forgetPassword' style={{backgroundImage: `url("${Background}")`}}>
                <div className="login">
                    <div className="title">用  户  注  册</div>
                    <div style={{color:"red"}}>{message}</div>
                    <div className="line">

                        <img className="smallImg" src={LoginCompany} alt={'name'}/>
                        <input placeholder="请输入用户名" value={name} type="text" onChange={this.handleName} onBlur={this.inputOnBlur}/>
                    </div>

                    <div className="line">
                        <img className="smallImg" src={LoginPassword} alt={'password'}/>
                        <input placeholder="请输入密码" value={password} type="password" onChange={this.handlePassword}/>
                    </div>
                    <div className="line">
                        <img className="smallImg" src={LoginPassword} alt={'password'}/>
                        <input placeholder="请确认密码" value={confirmPassword} type="password" onChange={this.handlePassword2} onBlur={this.handleConfirm}/>
                    </div>
                    {messagePassword}
                    <div className="line">
                        <img className="smallImg" src={LoginCompany} alt={'name'}/>
                        <input placeholder="请输入真实姓名" value={realName} type="text" onChange={this.handleRealName}/>
                    </div>
                    <div className="line">
                        <img className="smallImg" src={LoginCompany} alt={'name'}/>
                        工作地：
                        <Select  style={{ width: 100}} onChange={this.selectWorkPlaceId.bind(this)}>
                            {this.state.workplace}
                        </Select>
                    </div>
                    <div className="line">
                        <img className="smallImg" src={LoginCompany} alt={'name'}/>
                        技术领域：
                        <Select  style={{ width: 200}} onChange={this.selectTechnologyId.bind(this)}>
                            {this.state.technology}
                        </Select>
                    </div>

                    <div className="line">
                        <img className="smallImg" src={LoginUsername} alt={'email'}/>
                        <input placeholder="请输入邮箱" value={email} type="text" onChange={this.handleemail}/>
                    </div>

                    {tips}
                    <button type="button" className="logBut" onClick={this.handleRegister}>注&nbsp;&nbsp;册</button>
                </div>
            </div>
        );
    }
}

