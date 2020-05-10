import React,{Component} from 'react';
import {fetchPost} from "../../../utils/fetch";
import {Table,Modal} from 'antd';
import moment from "moment";
import ReportDetails from './../details'
import memoryUtils from "../../../utils/memoryUtils";

export default class List extends Component{

    state={
        data:[],
        queryTerms:[],
        requestLoading:true,
        isVisible:false
    };
    requestList= ()=>{
        const user = memoryUtils.user;
        console.log(user);
        fetchPost(global.constants.getProjectEmployeeRoleList,user)
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
    componentDidMount(){
        this.requestList();

    }
    setData = (list) => {
        this.setState({
            data: list.map((item, index) => {
                return {
                    ...item,
                    beginTime:moment(parseInt(item.beginTime)).format("YYYY-MM-DD"),
                    endTime:moment(parseInt(item.endTime)).format("YYYY-MM-DD"),
                    // updateTime:moment(parseInt(item.updateTime)).format("YYYY-MM-DD"),
                    key: index
                }
            })
        })
    };

    handleClick = (item)=>{
        this.setState({
            isVisible:true,
            queryTerms:item
        })

    };


    render() {

        const columns = [
            {
                title: '项目名称',
                dataIndex: 'projectName',
                render:(text, record)=>(
                    <a onClick={()=>this.handleClick(record)}>{text}</a>)
            },
            {
                title: '实施地',
                dataIndex: 'place',
            },
            {
                title: '项目负责人',
                dataIndex: 'leader',
            },
            {
                title: '本人角色',
                dataIndex: 'userType',
                render:(text,record)=>{

                    if(text === 0){
                        return "组长"
                    }else{
                        return "组员"
                    }

                },

            },
            {
                title: '开始时间',
                dataIndex: 'beginTime',

            },
            {
                title: '结束时间',
                dataIndex: 'endTime',

            },
            // {
            //   title: '最近更新',
            //   dataIndex: 'updateTime',
            // },
        ];
        const data = this.state.data;
        return(
            <div>
                <Table dataSource={data} columns={columns} />

                <Modal
                    title={"工作详情"}
                    visible={this.state.isVisible}
                    width={1000}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose={true}
                    onCancel={()=>{
                        this.setState({
                            isVisible:false,
                            queryTerms:''
                        })
                    }}
                >
                    <ReportDetails
                        queryTerms={this.state.queryTerms||{}}
                    />
                </Modal>

            </div>
        )

    }
}
