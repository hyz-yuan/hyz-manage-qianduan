import * as React from "react";
import {Button, Card, Modal, Popconfirm, Select, Table} from "antd";
import {Component} from "react";
import {fetchPost} from "../../../utils/fetch";
import {PlusOutlined} from "@ant-design/icons";
import mememoryUtils from "../../../utils/memoryUtils";
const { Option } = Select;
export default class Right extends Component{
    state={
        title:"权限管理",
        columns:[
            {title:'上级菜单',dataIndex:'lastMenus'},
            {title:'权限名',dataIndex:'rights'},
            {title:'链接',dataIndex:'urls'},
            {title:'备注',dataIndex:'notes'},
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
        visibleState: 0,//0是不显示，1是显示添加，2是显示修改，3是显示删除
        operator: mememoryUtils.user,//当前操作者
        modalData:[],//存储正在进行操作的数据（行）

    };

    componentDidMount(){
        this.setRight()
    }
    /*
   * 设置表的格式
   * */
    setProjectData =(list)=>{
        this.setState({
            dataSource: list.map((item, index) => {
                    return {
                        ...item,
                        key: index,
                    }
                }),
            }
        )
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


    setRight=()=>{
        let params={};
        fetchPost(global.constants.setRightList,params)
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

    insertRight=()=>{
        let params={};
        fetchPost(global.constants.insertRight,params)
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

    deleteRight=(record)=>{
        let params={id:record.id};
        fetchPost(global.constants.deleteRight,params)
            .then(
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                });
                this.setRight();
            })
    };

    render(){
        const {dataSource,columns}=this.state;
        const workPlace = this.state.oldWorkPlace ||{};
        //card左侧标签
        const title = '权限管理';
        //card右侧标签
        const extra =(
            <Button
                type='primary'
                onClick={this.showAddModal}
                style={{borderRadius:'6px',marginLeft:'6px'}}
                icon= {<PlusOutlined/>}
            >新增</Button>
        );
        return (
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
                    {/*<AddForm
                        rtWorkPlace={(newWorkPlace)=>{
                            this.setState({
                                newWorkPlace:newWorkPlace,
                            });
                        }}

                    />*/}
                </Modal>
                <Modal
                    title="修改"
                    visible={this.state.visibleState===2}
                    onOk={this.handleUpdateOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                >
                    {/*<UpdateForm
                        workPlace={workPlace}
                        rtWorkPlace={(newWorkPlace)=>{
                            this.setState({
                                newWorkPlace:newWorkPlace,
                            });
                        }}
                    />*/}
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