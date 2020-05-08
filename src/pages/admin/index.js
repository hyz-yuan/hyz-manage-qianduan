import React,{Component} from "react";
import {Layout} from "antd";
import mememoryUtils from "../../utils/memoryUtils";
import {Redirect, Route, Switch} from "react-router-dom";


/*
* 引入路由
* */
import LeftBar from "../../components/left-bar";
import Headers from "../../components/header";
/*
* manage
* */
import User from "../manage/user";
import Role from "../manage/role";
import Right from "../manage/right";
import Technology from "../manage/technology";
import Place from "../manage/place";
/*
* project
* */
import ProjectDetails from "../project/details";
import ProjectList from "../project/list";
import Manage from "../project/manage";
import Progress from "../project/progress";
import Setup from "../project/setup";
/*
* work
* */
import WorkDetails from "../work/details";
import WorkList from  "../work/list";
import Report from "../work/report";
/*
* charts
* */
import OrganizationChart from "../charts/organizationChart";

import Home from "../home";
import Message from "../message";


const {  Footer, Sider, Content } = Layout;
/*
* 后台管理的路由组件
* */
export default class Admin  extends Component{

    render() {
        const user  = mememoryUtils.user;

        if(!user || !user.id){
            alert("请重新登陆");
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftBar/>
                </Sider>
                <Layout>
                    <Headers>Header</Headers>
                    <Content style={{margin: '10px',backgroundColor:"#fff",height:'100%'}}>
                        <Switch>
                            {/*manage*/}
                            <Route path='/manage/user' component={User} />
                            <Route path='/manage/role' component={Role} />
                            <Route path='/manage/right' component={Right} />
                            <Route path='/manage/technology' component={Technology} />
                            <Route path='/manage/place' component={Place} />
                            {/*project*/}
                            <Route path='/project/details' component={ProjectDetails} />
                            <Route path='/project/list' component={ProjectList} />
                            <Route path='/project/manage' component={Manage} />
                            <Route path='/project/progress' component={Progress} />
                            <Route path='/project/setup' component={Setup} />
                            {/*work*/}
                            <Route path='/work/details' component={WorkDetails} />
                            <Route path='/work/list' component={WorkList} />
                            <Route path='/work/report' component={Report} />

                            <Route path='/charts/organizationChart' component={OrganizationChart} />
                            <Route path='/home' component={Home} />
                            <Route path='/message' component={Message} />
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', color : '#cccccc'}}>何远志出品</Footer>
                </Layout>
                {/*<Button onClick={()=>{
                    storageUtils.removeUser();
                    mememoryUtils.user={};
                    message.success('退出成功');
                    createHashHistory().replace('/login') ;
                }}>退出</Button>*/}
            </Layout>
        )
    }

}