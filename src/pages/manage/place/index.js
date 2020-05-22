import React, { Component } from  'react'
import {
    Button,
    message,
    Modal,
    Table,
    Card } from "antd";
import {
    PlusOutlined
} from '@ant-design/icons';
import {fetchPost} from "../../../utils/fetch";

import AddForm from "./add-form";
import UpdateForm from "./update-form";
import mememoryUtils from "../../../utils/memoryUtils";

export  default class Place extends Component{

    state={
        columns:[
            {
                title: '位置',
                dataIndex: 'workPlace',
                width:'70%',
            },
            {
                title:'操作',
                dataIndex: '123',
                render:(text,record)=>(
                    <span>
                        <a onClick={()=>this.showUpdateModal(record)}>修改</a>&nbsp;&nbsp;
                        <a onClick={()=>this.showDeleteModal(record)}>删除</a>
                     </span>
                )
            },

        ],
        dataSource:[],
        operator: mememoryUtils.user,//当前操作者
        modalData:[],//存储正在进行操作的数据（行）
        oldWorkPlace:'',//存储当前的地址名
        newWorkPlace:'',//存储要添加或修改的地址名
        visibleState: 0,//0是不显示，1是显示添加，2是显示修改，3是显示删除
    };

    componentDidMount() {
        this.requestData();
    }
    /*
    * 设置表的格式
    * */
    setProjectData=(list)=>{
        this.setState({
            data: list.map((item, index) =>{
                return {
                    ...item,
                    key: index,
                }
            }),
            dataSource: list.map((item, index) =>{
                return {
                    ...item,
                    key: index,
                }
            }),
        })
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
            oldWorkPlace:record.workPlace,
        })
    };
    showDeleteModal=(record)=>{
        this.setState({
            visibleState :3,
            modalData:record,
        })
    };
    /*
    * 对话框的ok操作
    * */
    /*
    * 添加
    * */
    handleAddOk = () => {
        const {operator,modalData, oldWorkPlace, newWorkPlace}=this.state;

        //定义参数
        let url = global.constants.insertWorkPlace;
        let params = {
            workPlace: newWorkPlace,
            operator:operator.realName,
        };
        //数据操作
        this.insertName(url,params);
        //关闭
        this.setState({
            visibleState: 0,
        });
    };
    /*
    * 更新
    * */
    handleUpdateOk = () => {
        const {operator,modalData, oldWorkPlace, newWorkPlace}=this.state;
        //定义参数
        let url = global.constants.updateWorkPlace;
        let params = {
            id:modalData.id,
            workPlace: newWorkPlace,
            operator:operator.realName,
        };
        //数据操作
        this.updateChange(url,params);
        //关闭
        this.setState({
            visibleState: 0,
        });
    };
    /*
    * 删除
    * */
    handleDeleteOk = () => {
        const {operator,modalData, oldWorkPlace, newWorkPlace}=this.state;
        //定义参数
        let url = global.constants.deleteWorkPlace;
        let params = {
            id:modalData.id,
        };
        //数据操作
        this.deleteChange(url,params);
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
    //数据库操作
    /*
   * 获取表
   * */
    requestData=()=>{
        let params={};
        fetchPost(global.constants. WorkPlaceSelect,params)
            .then(
                res => this.setProjectData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    };
    /*
    * 添加数据
    * */
    insertName=(url,params)=>{
        fetchPost(url,params)
            .then(
                res => {
                    message.success('添加成功');
                    this.setProjectData(res)}
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                });
                this.requestData(); })
    };
    /*
    * 更新数据
    * */
    updateChange=(url,params)=>{
        fetchPost(url,params)
            .then(
                res => {message.info("更新成功");
                }
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                });
                this.requestData();})
    };
    /*
    * 删除数据
    * */
    deleteChange=(url,params)=>{
        fetchPost(url,params)
            .then(
                res => {message.info("删除成功");
                    this.requestData();
                })

            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })

            })

    };

    render(){
        const {dataSource,columns}=this.state;
        const workPlace = this.state.oldWorkPlace ||{};
        //card左侧标签
        const title = '地域管理';
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
                        rtWorkPlace={(newWorkPlace)=>{
                            this.setState({
                                newWorkPlace:newWorkPlace,
                            });
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
                        workPlace={workPlace}
                        rtWorkPlace={(newWorkPlace)=>{
                            this.setState({
                                newWorkPlace:newWorkPlace,
                            });
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