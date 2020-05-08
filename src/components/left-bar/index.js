import React, {Component} from "react";
import {Menu } from 'antd';
import Icon, {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import './index.css';
import logo from '../../assets/images/logo.gif'


const { SubMenu } = Menu;
/*
* 左侧导航的组件
* */
export default class LeftBar  extends Component{
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        return (
            <div className='left-bar'>
                <Link to='/' className='left-bar-header'>
                    <img src={logo} alt='logo'/>
                    <h1>项目管理后台</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['0']}
                    defaultOpenKeys={['sub0']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="1" icon={<PieChartOutlined />} >
                        <Link to='/sys/home'>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu key="sub1" icon={<AppstoreOutlined  />} title="系统管理">
                        <Menu.Item key="2" icon={<MailOutlined />}>
                            <Link to='/sys/manage/user'>
                                <span>
                                    人员管理
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<MailOutlined />}>
                                <Link to='/sys/manage/right'>
                                <span>
                                    权限管理
                                </span>
                                </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<MailOutlined />}>
                                <Link to='/sys/manage/technology'>
                                <span>
                                    科技管理
                                </span>
                                </Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<MailOutlined />}>
                            <Link to='/sys/manage/role'>
                                <span>
                                    角色管理
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<MailOutlined />}>
                            <Link to='/sys/manage/place'>
                                <span>
                                    地域管理
                                </span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub2" icon={<AppstoreOutlined  />} title="项目">
                        <Menu.Item key="7" icon={<MailOutlined />}>
                            <Link to='/sys/project/details'>
                                <span>
                                    项目详情
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8" icon={<MailOutlined />}>
                            <Link to='/sys/project/list'>
                                <span>
                                    项目列表
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="9" icon={<MailOutlined />}>
                            <Link to='/sys/project/manage'>
                                <span>
                                    项目管理
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="10" icon={<MailOutlined />}>
                            <Link to='/sys/project/progress'>
                                <span>
                                    项目进展
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="11" icon={<MailOutlined />}>
                            <Link to='/sys/project/setup'>
                                <span>
                                    项目组建
                                </span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub3" icon={<AppstoreOutlined  />} title="工作">
                        <Menu.Item key="12" icon={<MailOutlined />}>
                            <Link to='/sys/work/list' >
                                <span>
                                    工作列表
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="13" icon={<MailOutlined />}>
                            <Link to='/sys/work/details'>
                                <span>
                                    工作详情
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="14" icon={<MailOutlined />}>
                            <Link to='/sys/work/report'>
                                <span>
                                    工作报告
                                </span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub4" icon={<AppstoreOutlined  />} title="图表">
                        <Menu.Item key="15" icon={<MailOutlined />}>
                            <Link to='/sys/charts/organizationChart' >
                                <span>
                                    组织关系图
                                </span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="16" icon={<MailOutlined />} >
                        <Link to='/sys/message'>
                                <span>
                                    消息管理
                                </span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }

}