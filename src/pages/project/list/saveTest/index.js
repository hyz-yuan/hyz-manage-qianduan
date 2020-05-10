import React, { useState } from 'react';
import {Table, Input, Button, Modal} from "antd";
import {fetchPost} from "../../../utils/fetch";
import {createHashHistory} from "history";
import RightBodyHeaderBar from "../../../components/rightBodyHeaderBar";
import moment from "moment";
//import {ExclamationCircleOutlined} from '@ant-design/icons';

export default class List extends React.Component {

    state = {
        projectId: null,
        title: "项目列表",
        searchValue: '',
        columns: [
            {title: '序号', dataIndex: '', render: (text, record, index) => `${index + 1}`},
            {
                title: '项目名称', dataIndex: 'projectName',
                //点击项目名称后，进行跳转
                render: (text, record) => (<a onClick={() => this.goChildren(record.id)}>{text}</a>)
            },
            {title: '实施地', dataIndex: 'workPlaceName',},
            {title: '负责人', dataIndex: 'managerName',},
            {title: '开始时间', dataIndex: 'beginTime',},
            {title: '结束时间', dataIndex: 'endTime',},
            {
                title: '操作', dataIndex: 'action',
                render: (text, record) => <span>
        <a className={"changeProject"} onClick={() => this.handleProjectManage(record.id)}>修改</a>&nbsp;&nbsp;
                    <a className={"deleteProject"} onClick={() => this.showDeleteConfirm(record.id)}>删除</a>
      </span>
            }
        ],
        data: [],
        requestLoading: true,
        visible: false,
    };
    
    //修改项目
    handleProjectManage = (id) => {
        sessionStorage.clear();
        //注意路径最后的斜杠，丢了不能路由过来
        createHashHistory().push('/sys/projectManage/' + id)
    };

    //路由到下一级
    goChildren = (id) => {
        sessionStorage.clear();
        createHashHistory().push('/sys/projectDetail?id=' + id)
    };



    componentDidMount = (value) => {
        let params = {projectName: value};
        fetchPost(global.constants.projectList, params)
            .then(
                res => this.setData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    };

    //赋予表格数据
    setData = (list) => {
        //  alert(list[0].beginTime)
        this.setState({
            data: list.map((item, index) => {
                return {
                    ...item,
                    beginTime: moment(item.beginTime).format("YYYY-MM-DD"),
                    endTime: moment(item.endTime).format("YYYY-MM-DD"),
                    key: index
                }
            })
        })
    };

    //修改为删除弹出框样式
    showDeleteConfirm = (id) => {
        Modal.confirm({
            title: '确认删除此项目吗?',
            // icon: <ExclamationCircleOutlined/>,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                this.handleOk(id)
            }
            ,
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    //删除的弹出框的确认按钮,执行删除操作
    handleOk = (id) => {
        let params = {id: id};
        fetchPost(global.constants.deleteProject, params).then(
            res => this.setData(res)
        ).catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            });
    };


    render() {
        const {data, columns, title} = this.state;
        return (
            <div>
                <RightBodyHeaderBar title={title}/>
                <Input.Search addonBefore={"项目查询"} placeholder="请输入项目名称" enterButton="查询"
                              style={{width: 400}}
                              pagination={{position:'bottom',pageSize:5}}
                              onSearch={value => this.componentDidMount(value)}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" name={"addProject"} onClick={() => this.handleProjectManage(0)}>新增项目</Button>
                <Table dataSource={data} pagination={{pageSize: 5}} columns={columns}/>
            </div>
        )
    }
}



