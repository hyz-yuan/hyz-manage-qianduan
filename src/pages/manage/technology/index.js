import * as React from "react";
import {Table, Button, Select} from "antd/lib/index";
import {fetchPost} from "../../../utils/fetch";

import {PlusOutlined} from "@ant-design/icons";
import {Card, Modal} from "antd";
import AddForm from "./add-form";
import UpdateForm from "./update-form";
import mememoryUtils from "../../../utils/memoryUtils";
import {message} from "antd/es";


export default class Technology extends React.Component{
    state={
        columns: [
            {
                title: '上级名称',
                dataIndex: 'pIdName',
                width: '30%',
                inputType:'select',
                editable: true,
            },
            {
                title: '技术名称',
                dataIndex: 'technologyName',
                editable: true,
            },
            {
                title:'操作',
                dataIndex: '123',
                render:(text,record)=>(
                    <span>
                        <a onClick={()=>this.showUpdateModal(record)}>修改</a> &nbsp;&nbsp;
                        <a onClick={()=>this.showDeleteModal(record)}>删除</a>
                     </span>
                )
            },
        ],
        title:"技术管理",
        dataSource: [],
        operator: mememoryUtils.user,//当前操作者
        modalData:[],//存储正在进行操作的数据（行）
        visibleState: 0,//0是不显示，1是显示添加，2是显示修改，3是显示删除
        newPId:0,
        currentId:-1,
        newTechnology:'',
    };

    /*
    * 对话框的显示
    * */
    showAddModal=()=>{
        this.setState({
            visibleState :1,
        })
    };
    showUpdateModal=(record)=>{
        this.setState({
            visibleState :2,
            modalData:record,
            currentId:record.id,
        })
    };
    showDeleteModal=(record)=>{
        this.setState({
            visibleState :3,
            modalData:record,
            currentId:record.id,
        })
    };
    /*
    * 对话框的ok操作
    * */
    /*
    * 添加
    * */
    handleAddOk = () => {
        const {operator, newPId,newTechnology}=this.state;

        //定义参数
        let url = global.constants.insertTechnology;
        let params = {
            pId: newPId,
            technologyName:newTechnology,
            operator:operator.realName,
        };
        //数据操作
        this.requestUpdate(url,params);
        //关闭
        this.setState({
            visibleState: 0,
        });
    };
    /*
    * 更新
    * */
    handleUpdateOk = () => {
        const {operator, modalData,newPId,newTechnology}=this.state;
        //定义参数
        let url = global.constants.updateTechnology;
        let params = {
            id:modalData.id,
            pId: newPId,
            technologyName:newTechnology,
            operator:operator.realName,
        };
        //数据操作
        this.requestUpdate(url,params);
        //关闭
        this.setState({
            visibleState: 0,
        });
    };
    /*
    * 删除
    * */
    handleDeleteOk = () => {
        const {operator, modalData}=this.state;
        //定义参数
        let url = global.constants.deleteTechnology;
        let params = {
            id:modalData.id,
            operator:operator.realName,
        };
        //数据操作
        this.requestUpdate(url,params);
        //关闭
        this.setState({
            visibleState: 0,
        });
    };
    /*
     * 对话框的Cancel操作
     * */
    handleCancel = e => {
        console.log(e);
        this.setState({
            visibleState: 0,
        });
    };

    componentDidMount() {
        this.loadData();
    }



    /*
    * 数据库操作
    * */
    requestProgress = (url,params) =>{
        fetchPost(url,params)
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
    requestUpdate = (url,params) =>{
        fetchPost(url,params)
            .then(
                res=>message.info(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.loadData();
                this.setState({
                    requestLoading: false
                })
            })
    };
    /*
    * 转换数据格式
    * */
    setData = (list) => {
        let pname ={};
        this.options=[];
        this.options.push(<Select key='0'>第一级</Select>);

        list.map((item, index) => {
            pname[item.id]=item.technologyName;
            this.options.push(<Select key={item.id}>{item.technologyName}</Select>);
        });
        this.setState({
            dataSource: list.map((item, index) => {
                return {
                    ...item,
                    pIdName:item.pId===0?"第一级":pname[item.pId],
                    key: index

                }
            }),
        })
        //message.info("保存成功！")
    };
    /*
    * 获取数据表
    * */
    loadData(){
        let params={};
        this.requestProgress(global.constants.technologySelect,params);
    };
    /*
    * 删除数据
    * */
    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        let params={
            id:dataSource[key].id,
        };
        this.requestProgress(global.constants.deleteTechnology,params);
    };


    render(){
        const {dataSource,columns}=this.state;
        const currentId = this.state.currentId ;
        //card左侧标签
        const title = '技术管理';
        //card右侧标签
        const extra =(
            <Button
                type='primary'
                onClick={this.showAddModal}
                style={{borderRadius:'6px',marginLeft:'6px'}}
                icon= {<PlusOutlined/>}
            >新增</Button>
        );
        return(
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    rowKey='key'
                    scroll={{ y: 425 }}
                />
                <Modal
                    title="添加"
                    visible={this.state.visibleState===1}
                    onOk={this.handleAddOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                >
                    <AddForm
                        rtNewTechnology={(technology)=>{
                            this.setState({
                                newTechnology:technology,
                            });
                        }}
                        rtNewPid={(pid)=>{
                            this.setState({
                                newPid:pid,
                            })
                        }}

                    />
                </Modal>
                <Modal
                    title="修改"
                    visible={this.state.visibleState===2}
                    onOk={this.handleUpdateOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                >
                    <UpdateForm
                        currentId={currentId}
                        rtNewTechnology={(technology)=>{
                            this.setState({
                                newTechnology:technology,
                            });
                        }}
                        rtNewPid={(pid)=>{
                            this.setState({
                                newPid:pid,
                            })
                        }}

                    />
                </Modal>
                <Modal
                    title="删除"
                    visible={this.state.visibleState===3}
                    onOk={this.handleDeleteOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                >是否删除数据
                </Modal>
            </Card>
        )
    }
}