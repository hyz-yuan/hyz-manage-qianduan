import * as React from "react";
import {Radio, Button, Popconfirm, Select, Table, Input, Modal} from "antd";
import {Component} from "react";
import {fetchPost} from "../../../utils/fetch";
import RightBodyHeaderBar from "../../../components/rightBodyHeaderBar";
import Place from "../place";
const { Option } = Select;
export default class User extends Component{
    state={
        title:"人员管理",
        buttonValue:"查询",
        //查询人员用到
        selectName:"",
        selectTec:0,
        selectTecName:"",
        //修改密码时用到
        id:"",
        password:"",
        visible: false,
        columns:[
            {title:'序号',dataIndex:'Index'},
            {title:'工作地',dataIndex:'workPlace',
                render:(text,record)=>(
                    <span>
                 <Select
                     value={this.state.data[record.key].workPlaceName}
                     style={{ width: '100%' }}
                     onSelect={(e,obj)=>this.handleChangeSelect({workPlace:e},{workPlaceName: obj.props.children},record)}
                 >
                      {this.state.area.map((item,index) => <Option key={index} value={item.id}>{item.workPlace}</Option>)}
                 </Select>
               </span>)},
            {title:'姓名',dataIndex:'realName'},
            {title:'技术领域',dataIndex:'technology',
                render:(text,record)=>(
                    <span>
                        <Select
                            value={this.state.data[record.key].technologyName}
                            style={{ width: '100%' }}
                            onSelect={(e,obj)=>this.handleChangeSelect({technology:e},{technologyName: obj.props.children},record)}
                        >
                      {this.state.technology.map((item,index) => <Option key={index} value={item.id}>{item.technologyName}</Option>)}
                 </Select>
               </span>)},
            {title:'领域定位',dataIndex:'fieldPosition',
                render:(text,record)=>(
                    <span>
                  <Radio.Group
                      onChange={(e)=>this.handleChangeField(e.target.value,record)} value={this.state.data[record.key].fieldPosition}>
                    <Radio value={1}>组长</Radio>
                    <Radio value={2}>小组长</Radio>
                    <Radio value={3}>组员</Radio>
                  </Radio.Group>
               </span>)},
            {title:'当前角色',dataIndex:'role',
                render:(text,record)=>(
                    <span>
               <Select
                   value={this.state.data[record.key].roleName}
                   style={{ width: '100%' }}
                   onSelect={(e,obj)=>this.handleChangeSelect({role:e},{roleName: obj.props.children},record)}
               >
                      {this.state.role.map((item,index) => <Option key={index} value={item.roleId}>{item.roleName}</Option>)}
                 </Select>
               </span>)},
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={() => this.handleOk(record)}>修改密码</a>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteEmployee(record)}>
                        <a style={{ marginLeft:'3%' }} >删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ],
        //后端传过来的值
        data:[],//所有员工信息
        area:[],//所有工作地
        role:[],//所有角色信息
        technology:[],//所有技术领域信息
    };

    componentDidMount(){
        this.selectAllData();
    }

    setAllEmployeeData =(list)=>{
        this.setState({
                data: list.map((item, index) => {
                    return {
                        ...item,
                        id:item.id,
                        deleteFlag:item.delFlag,
                        Index:index+1,
                        key: index,
                    }
                }),
            }
        )
    };
    setRoleData =(list)=>{
        this.setState({
                role: list.map((item, index) => {
                    return {
                        ...item,
                        id:item.id,
                        deleteFlag:item.delFlag,
                        Index:index+1,
                        key: index,
                    }
                }),
            }
        )
    };
    setTechnologyData =(list)=>{
        this.setState({
                technology: list.map((item, index) => {
                    return {
                        ...item,
                        id:item.id,
                        deleteFlag:item.delFlag,
                        Index:index+1,
                        key: index,
                    }
                }),
            }
        )
    };
    setWorkPlaceData =(list)=>{
        this.setState({
                area: list.map((item, index) => {
                    return {
                        ...item,
                        id:item.id,
                        deleteFlag:item.delFlag,
                        Index:index+1,
                        key: index,

                    }
                }),
            }
        )
    };
    selectAllData=()=>{
        let params={};
        fetchPost(global.constants.allUser,params)
            .then(
                res => this.setAllEmployeeData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            });
        fetchPost(global.constants.setRoleList,params)
            .then(
                res => this.setRoleData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            });
        fetchPost(global.constants.selectWorkPlace,params)
            .then(
                res => this.setWorkPlaceData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })

            });

        fetchPost(global.constants.selectTechnology,params)
            .then(
                res => this.setTechnologyData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    };

    //更新工作地，技术领域，领域定位，当前角色
    handleChangeField=(checkedValues,record)=>{
        record.fieldPosition=checkedValues;
        this.updateUser(record)
    };
    handleChangeSelect = (e,obj,record) => {
        for (let i in e) {
            record[i] = e[i];//这一句是必须的，不然状态无法更改
        }
        for (let i in obj) {
            record[i] = obj[i];//这一句是必须的，不然状态无法更改
        }
        let a =this.state.data;
        this.setState({
            a:record
        });
        this.updateUser(record)
    };
    updateUser=(record)=>{
        let params={
            id:record.id,
            workPlace:record.workPlace,
            technology:record.technology,
            role:record.role,
            fieldPosition:record.fieldPosition
        };
        fetchPost(global.constants.updateUser,params)
            .then(
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    };

    //修改密码
    handleOk=(record)=>{
        this.setState({
            id: record.id,
            visible: true });
    };
    handleInputPass=(checkedValues)=>{
        this.setState({password:checkedValues})
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleChangePassWord=()=>{
        let params={
            id:this.state.id,
            password:this.state.password,
        };
        fetchPost(global.constants.changePassword,params)
            .then(
                res=>this.setState({
                    password:"",
                    visible: false })
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    };

    //查询员工
    handleSetName=(value)=>{
        this.setState({
            selectName:value,
        })
    };
    handleSetRole=(e,obj)=>{
        this.setState({
            selectTecName:obj.props.children,
            selectTec:e,
        })
    };
    selectEmployee=()=>{
        let params={
            input:this.state.selectName,
            technology:this.state.selectTec,
        };
        fetchPost(global.constants.searchEmployee,params)
            .then(
                res => this.setAllEmployeeData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false,
                })
            })
    };

    //删除人员
    deleteEmployee=(record)=>{
        let params={id:record.id};
        fetchPost(global.constants.deleteUser,params)
            .then(
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                });
                this.selectAllData();
            })
    };

    render(){
        return (
            <div>
                <RightBodyHeaderBar title={this.state.title}/>
                <Input  style={{ width: '20%',marginRight:'3%',marginLeft:'1%' }} placeholder="员工姓名" onChange={(e)=>this.handleSetName(e.target.value)} />
                <Select
                    value={this.state.selectTecName}
                    style={{ width: '15%',marginRight:'2%' }}
                    onSelect={(e,obj)=>this.handleSetRole(e,obj)}
                >
                    {this.state.technology.map((item,index) => <Option key={index} value={item.id}>{item.technologyName}</Option>)}
                </Select>
                <Button style={{marginRight:'2%' }}  onClick={()=>this.selectEmployee()}>查询</Button>
                <Button onClick={()=>this.selectAllData()}>全部人员</Button>
                <Modal
                    title="修改密码"
                    visible={this.state.visible}
                    onOk={()=>this.handleChangePassWord()}
                    onCancel={this.handleCancel}
                >
                    <a>请输入新密码</a>
                    <Input value={this.state.password} onChange={(e)=>this.handleInputPass(e.target.value)}/>
                </Modal>
                <Table dataSource={this.state.data} pagination={{pageSize: 7}} columns={this.state.columns}/>
            </div>
        )
    }



}