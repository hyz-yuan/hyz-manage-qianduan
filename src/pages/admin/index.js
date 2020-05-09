import React,{Component} from "react";
import {Layout} from "antd";
import mememoryUtils from "../../utils/memoryUtils";
import {Redirect, Route, Switch} from "react-router-dom";
import {HashRouter} from "react-router-dom";

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
                        <HashRouter>
                            <Switch>
                                {/*manage*/}
                                <Route path='/sys/manage/user' component={User} />
                                <Route path='/sys/manage/role' component={Role} />
                                <Route path='/sys/manage/right' component={Right} />
                                <Route path='/sys/manage/technology' component={Technology} />
                                <Route path='/sys/manage/place' component={Place} />
                                {/*project*/}
                                <Route path='/sys/project/details' component={ProjectDetails} />
                                <Route path='/sys/project/list' component={ProjectList} />
                                <Route path='/sys/project/manage' component={Manage} />
                                <Route path='/sys/project/progress' component={Progress} />
                                <Route path='/sys/project/setup' component={Setup} />
                                {/*work*/}
                                <Route path='/sys/work/details' component={WorkDetails} />
                                <Route path='/sys/work/list' component={WorkList} />
                                <Route path='/sys/work/report' component={Report} />

                                <Route path='/sys/charts/organizationChart' component={OrganizationChart} />
                                <Route path='/sys/home' component={Home} />
                                <Route path='/sys/message' component={Message} />

                                <Redirect to='/sys/home'/>
                            </Switch>
                        </HashRouter>
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