import React, {Component} from "react";
import './index.css'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import './index.css';
import {message, Modal} from 'antd'
import {createHashHistory} from "history";
/*
* 顶部组件的组件
* */
import Logo from '../../assets/images/logo.gif';
import  {formatDate} from '../../utils/dateUtils';

export default class Headers  extends Component{
    state ={
        currentTime : formatDate(Date.now()), //当前时间
        weather : '晴', //当前天气
        visible: false,//控制modal显示
        confirmLoading: false,//控制modal确定按钮 loading
    };

    refreshCurrentTime = () =>{
        //每隔一秒获取当前时间并更新currentTime
        setInterval(()=>{
            const currentTime = formatDate(Date.now());
            this.setState({currentTime});
        },1000)
    };
    /*
    * 显示确认框
    * */
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    /*
    * 退出登录
    * */
    logout =()=> {
        memoryUtils.user = {};
        storageUtils.removeUser();
        message.success('退出成功');
        createHashHistory().replace('/login');
    };

    /*
    * 在第一次render()之后执行一次
    * 一般在此执行异步操作：发送数据请求/启动定时器
    * */
    componentDidMount() {

        this.refreshCurrentTime();

    }


    render() {
        const userName = memoryUtils.user.userName ;
        const {currentTime,weather,visible,confirmLoading} = this.state ;
        return (
            <div className='headers'>
                <div className='headers-top'>
                    <span>欢迎{userName}</span>
                    <a href='javascript:' onClick={this.showModal}>退出</a>
                    <Modal
                        title=""
                        visible={visible}
                        onOk={this.logout}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                    >
                        <p>确认退出</p>
                    </Modal>
                </div>
                <div className='headers-bottom'>
                    <div className='headers-bottom-left'>
                        首页
                    </div>
                    <div className='headers-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={Logo} alt='logo'/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }

}