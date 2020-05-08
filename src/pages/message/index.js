import React, { Component } from  'react'
import {Button, Modal, Table} from "antd";
import {fetchPost} from "../../utils/fetch";
import MessageInsert from "./MessageInsert";
import moment from 'moment';
import { Descriptions } from 'antd';



class Message extends  Component{



    state={
        columns:[
            { title: '项目名称',dataIndex: 'projectName'},
            { title: '日期',dataIndex: 'operatorTime'},
            {title: '发送人',dataIndex: 'operator'},
            {title: '来源',dataIndex: 'projectName'},
            {title: '消息内容',dataIndex: 'content',ellipsis: true},
            {title: '状态',dataIndex: 'state',},
            /* {
                 title: '操作',
                 dataIndex: '',
                 key: 'x',
                 render: () => <a onClick={()=>{
                     console.log(this.state.row)
                 }
                 }>Delete</a>,
             },*/
        ],

        currentRow : [],
        currentMassage : [],
        currentTime : [],
        currentOperator : [],
        messageList:[],
        visible:false,
        insertData:[],
        child :[]

    };
    //得到Message数据
    componentDidMount() {
        this.requestList();

    };
    requestList=()=>{
        let params = {
            id:2
        }
        fetchPost("http://localhost:9080/test/message/getList",params)
            .then( res => this.handleMessageData(res))
            .catch(e => console.log(e))
            .finally(() => {

            });

    };

    //处理数据的格式
    handleMessageData = (list) =>{
        this.setState({
            messageList:list.map((item, index) => {
                return {
                    ...item,
                    state: item.state === 0 ? '未读':'已读',
                    operatorTime:moment(parseInt(item.operatorTime)).format("YYYY-MM-DD"),
                    key: index
                }
            })
        },()=>{
            console.log(this.state.messageList);
            }
            );
    }
    //显示发送数据虚拟框
    displayInsertModal = ()=>{
        this.setState({
            visible:true

        });
    }
    //点击ok后的操作
    clickOnOk=(child)=>{
        if(child.state.select1Value.length === 0){
            alert("请选择发送类型");
            return ;
        }
        if(child.state.select2Value.length === 0){
            alert("请选择接收者");
            return;
        }
        if(child.state.inputData.length === 0){
            alert("请输入要发送的信息");
            return;
        }
        this.handleMessage();

    };
    //处理发送的消息
    handleMessage=()=>{
        this.setState({
            insertData : {
                type : this.child.state.select1Value ,
                receiver : this.child.state.select2Value ,
                content : this.child.state.inputData,
                operator : 'test'
            }
        }, ()=>{
            this.sendMessage()
            //放入回调函数中，再修改数据后在调用
        })
    };
    //发送消息
    sendMessage = ()=>{
        console.log(this.state.insertData)
        let data = this.state.insertData;
        console.log(data);

        let params = {
            ...data,
            projectId:2

        };
        console.log(params)
        fetchPost("http://localhost:9080/test/message/insertNewMessage",params)
            .then()
            .finally(()=>{
                this.setState({
                    visible:false,
                    insertData:{}
                })
                this.requestList();

            })
    };
    //处理更新的数据
    handleState=(value)=>{
        this.setState({
            insertData : {
                id : value ,
                userId : 2 ,
            }
        }, ()=>{
            this.updateState()
            //放入回调函数中，再修改数据后在调用
        })
    }
    //状态更新
    updateState = ()=>{


        let data = this.state.insertData;
        console.log(data);


        let params = {
            ...data,

        };
        fetchPost("http://localhost:9080/test/message/updateReader",params)
            .then()
            .finally(()=>{
                this.setState({
                    visible:false,
                    insertData:''
                });
                this.requestList();

            })
    };


    render() {
        const data = this.state.messageList||{};

        return(
            <div>
                <Table dataSource={data}
                       columns={this.state.columns}
                    /*expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}*/
                       onRow={(record,index)=>{return{onClick:()=> {
                               this.setState({
                                   currentRow : index,
                                   currentMassage : record.content,
                                   currentTime : record.operatorTime,
                                   currentOperator : record.operator,
                               });
                               if ( record.state=== '未读' ){
                                   record.state = '已读';
                                   this.handleState(record.id);
                               }
                               /*alert(record.id)*/

                           }}}}
                       scroll={{ y: 200 }}/>
                <Button type="primary"  onClick={()=> {this.displayInsertModal()  }}>添加记录</Button>
                <Modal

                    title={"消息发送"}
                    visible={this.state.visible}
                    width={1000}
                    maskClosable={false}
                    destroyOnClose={true}
                    onOk={()=>{
                        this.clickOnOk(this.child);
                    }}
                    onCancel={()=>{
                        this.setState({
                            visible:false,
                            insertData:{}
                        })
                    }}>
                    <MessageInsert
                        onRef={(ref) => { this.child = ref; }}
                        insertData={this.state.insertData||{}}
                        dispatchData={(data)=>{this.setState({insertData:data})}}
                    />
                </Modal>
                <Descriptions title="消息"
                              bordered = {true}
                              column ={2}

                >
                    <Descriptions.Item label="发送人">{this.state.currentOperator}</Descriptions.Item>
                    <Descriptions.Item label="时间">{this.state.currentTime}</Descriptions.Item>
                    <Descriptions.Item label="内容"
                                       style={{height:'150px',margin:'0 0 0    0'}}
                    >
                        {this.state.currentMassage}
                    </Descriptions.Item>
                </Descriptions>
                {/*<span>有{recor}条未读消息</span>*/}
            </div>

        )
    }
}
export default  Message;

