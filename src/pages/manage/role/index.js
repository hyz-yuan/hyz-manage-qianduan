import * as React from "react";
import {Input, Checkbox, Button, Popconfirm, Table, Modal, Menu, Tree} from "antd";
import {Component} from "react";
import {fetchPost} from "../../../utils/fetch";
import RightBodyHeaderBar from "../../../components/rightBodyHeaderBar";
const {SubMenu} = Menu;

export default class Role extends Component{
    state={
        buttonValue:"新增",
        title:"角色管理",
        columns:[
            {title:'序号',dataIndex:'Index'},
            {title:'角色名称',dataIndex:'roleName'},
            {title:'权限名',dataIndex:'rightsName',width:500},
            {title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                    <a  onClick={() => this.selectRecord(record)}>修改</a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteRole(record)}>
                        <a  style={{ marginLeft:'3%' }}>删除</a>
                    </Popconfirm>
                    </span>
                ),
            },
        ],
        data:[],
        //新的角色权限用到
        newRole:[],

        //修改角色的权限向后端提交的字段
        selectRoleId:0,
        selectRightList:[],
        updateList:[],

        //Tree的显示
        rightsTree:[],
        childList:[],

        flag: false,
        flagL:true,
        visible: false,
    };

    componentDidMount(){
        this.setRole()
    }

    setRole=()=>{
        let params={};
        fetchPost(global.constants.setRoleList,params)
            .then(
                res => this.setProjectData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            });

        fetchPost(global.constants.setRightList,params)
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

    setProjectData =(list)=>{
        this.setState({
                data: list.map((item, index) => {
                    return {
                        ...item,
                        id:item.id,
                        deleteFlag:item.delFlag,
                        Index:index+1,
                        key: index,
                        flag: false
                    }
                }),
            }
        )
    };
    //设置权限的主菜单和子菜单
    setData = (list) => {
        this.setState({
                rights: list.map((item, index) => {
                    return {
                        ...item,
                        id:item.id,
                        Index:index+1,
                        key: index,
                        flag: false
                    }
                }),
            }
        );
        this.sub(this.state.rightsTree,list,0)
    };
    sub =(TreeData,list,pid)=>{
        return list.map((item, index) => {
            if(item.lastMenus===pid){
                if(pid===0){
                    TreeData.push({title:item.rights,key:item.id,style:{height:"40px"},children:[]})
                    this.sub(TreeData,list,item.id)
                }else{
                    TreeData.map(node=>{
                        if(node.key==item.lastMenus)
                        {
                            this.state.childList.push(item.id);
                            node.children.push({title:item.rights,key:item.id,style:{height:"40px"}})
                        }
                    });
                    this.state.rightsTree=TreeData
                }
            }
        })
    };
    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            flag:false,
            updateList:[],
            newRole:[],
            selectRoleId:0
        });
    };

    insertNewRole = () => {
        if(this.state.flag) {
            let param = {
                roleId: this.state.selectRoleId,
                roleName:this.state.newRole.roleName,
                rightsList: this.state.newRole.rightsList
            };
            fetchPost(global.constants.updateRole, param)
                .then(
                )
                .catch(e => console.log(e))
                .finally(() => {
                    this.setState({
                        requestLoading: false,
                        visible: false,
                        selectRoleId:0,
                        flag:false,
                        updateList:[],
                        newRole: [],
                        childList:[],
                        rightsTree:[],
                    });
                    this.setRole()
                })
        }
        else{
            let params = {
                roleName: this.state.newRole.roleName,
                rightsList: this.state.newRole.rightsList
            };
            fetchPost(global.constants.insertRole, params)
                .then(
                )
                .catch(e => console.log(e))
                .finally(() => {
                    this.setState({
                        requestLoading: false,
                        visible: false,
                        childList:[],
                        rightsTree:[],
                        newRole: [],
                    });
                    this.setRole()
                })
        }
    };

    deleteRole=(record)=>{
        let params={id:record.roleId};
        fetchPost(global.constants.deleteRole,params)
            .then(
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    childList:[],
                    rightsTree:[],
                    requestLoading: false
                });
                this.setRole();
            })
    };


    //查询角色已有的权限
    selectRecord=(record)=>{
        this.state.newRole.roleName=record.roleName;
        this.state.selectRoleId=record.roleId;
        let params={id:record.roleId};
        fetchPost(global.constants.selectItem,params)
            .then(
                res => this.setItemListData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.state.updateList=[];
                for(let i=0;i<this.state.selectRightList.length;i++)
                {
                    for(let j=0;j<this.state.childList.length;j++)
                    {
                        if(this.state.selectRightList[i].rightId === this.state.childList[j])
                        {this.state.updateList.push(this.state.selectRightList[i].rightId)}
                    }
                }
                this.state.newRole.rightsList=this.state.updateList;
                this.setState({
                    requestLoading: false,
                    visible: true,
                    flag:true
                })
            })
    };

    setItemListData =(list)=>{
        this.setState({
            selectRightList: list.map((item, index) => {
                return {
                    ...item,
                    id:item.id,
                    deleteFlag:item.delFlag,
                    Index:index+1,
                    key: index,
                    flag: false
                }
            }),
        })
    };

    //插入姓名和权限
    handleInsertName=(checkedValues)=>{
        this.state.newRole.roleName=checkedValues;
    };

    handleInsertRights=(checkedKeys, e)=> {
        this.state.newRole.rightsList=[...checkedKeys, ...e.halfCheckedKeys];
    };

    render(){
        const {title,menus} = this.state;
        return (
            <div>
                <RightBodyHeaderBar title={title}/>
                <Button style={{marginLeft:'1%' }} onClick={this.showModal}>新增</Button>
                <Table dataSource={this.state.data}  pagination={{pageSize: 7}} columns={this.state.columns}/>
                <div  style={{height:"300px"}}>
                    <Modal
                        destroyOnClose={true}
                        visible={this.state.visible}
                        title="新增/修改"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.insertNewRole}>
                                提交
                            </Button>,
                        ]}>
                        <a href="#">角色名称</a>
                        <Input defaultValue={this.state.newRole.roleName} onChange={(e)=>this.handleInsertName(e.target.value)}/>
                        <a href="#">权限选择（可多选）</a>
                        <div style={{height:"250px" ,overflow:"auto"}}>
                            <Tree
                                style={{height:"250px" ,overflow:"auto"}}
                                checkable
                                defaultCheckedKeys={this.state.newRole.rightsList}
                                onCheck={this.handleInsertRights}
                                treeData={this.state.rightsTree}
                            />
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }


}

