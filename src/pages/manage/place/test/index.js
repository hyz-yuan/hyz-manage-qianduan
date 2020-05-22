import React, { Component } from  'react'
import {Button, message,Input,Table,Select} from "antd";
import {fetchPost} from "../../../utils/fetch";
export  default class Place extends Component{

    state={
        columns:[
            // {
            //     title: '序号',
            //     dataIndex: 'id',
            //     key:'id'
            // },

            {
                title: '位置',
                dataIndex: 'workPlace',
                editable:true,
                key:'workPlace',
                render:(text,record)=>(

                    <Input size="default" value={record.workPlace}

                           onChange={(e)=>this.inputChange({workPlace:e.target.value},record)}

                           onBlur={this.handleOnBlur.bind(this,record)}
                    />

                )
            },
            {
                title:'操作',
                dataIndex: '123',
                key:'123',
                render:(text,record)=>(
                    <span>
                        <Button onClick={this.deleteChange.bind(this,record)}>删除</Button>
                     </span>
                )
            },

        ],
        data:[],
        dataSource:[],
    };

    componentDidMount() {
        this.requestData();

    }

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

    inputChange=(e,record)=> {
        console.log(e);
        for(let i in e){
            record[i]=e[i];
        }
        this.setState({
            workPlace:e,

        })
    };

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
    * 增加一行
    * */
    onClickAdd = () => {
        const  {dataSource,data}  = this.state;
        if(dataSource.length!==data.length){
            message.info('一次只能添加一个数据');
            return ;
        }
        const newData = {
            workPlace: '',
            key: dataSource.length+1,
        };
        console.log(dataSource);
        this.setState({
            dataSource: [...dataSource,newData],
        });
    };
    /*
    * 删除一行,判断删除新添加的还是要删除的
    * */
    onClickRemove=(record)=>{
        const  {data,dataSource} =this.state;
        if(record.workPlace.length===0){
            const  {data}  = this.state;
            this.setState({
                dataSource: data,
            });
            message.success('无操作');
            return;
        }else {
            this.deleteChange(record);
            return;
        }
    };
    /*
    * 删除数据
    * */
    deleteChange=(record)=>{
        let params1={id:record.id,};
        fetchPost(global.constants.deleteWorkPlace,params1)
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
    /*
    * 判断修改的数据是否是新增的数据决定调用的函数
    * */
    handleOnBlur=(record)=>{
        const  {data,dataSource} =this.state;
        if(dataSource.length!==data.length){
            this.insertName(record);
            return;
        }else {
            this.updateChange(record);
            return;
        }
    };
    /*
    * 添加数据
    * */
    insertName=(record)=>{
        if(record.workPlace.length===0){
            message.info('请写入值');
            return ;
        }
        let params={
            workPlace:record.workPlace,
        };
        fetchPost(global.constants.insertWorkPlace,params)
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
    updateChange=(record)=>{
        if(record.workPlace.length===0){
            message.info('请写入值');
            return ;
        }
        let params1={
            id:record.id,
            workPlace:record.workPlace,
        };
        fetchPost(global.constants.updateWorkPlace,params1)
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

    render(){
        return(
            <div style={{width:'100%'}}>

                <Button onClick={this.onClickAdd} style={{borderRadius:'6px',marginLeft:'6px'}}>新增</Button>
                <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    rowKey={'key'}
                    scroll={{ y: 425 }}
                />
            </div>
        )
    }
}