import React,{Component} from 'react';
import {Col,Row,Select,Input} from 'antd';
import {fetchPost} from "../../utils/fetch";




const { Option } = Select;
const { TextArea } = Input;

class MessageInsert extends Component{
    state = {
        data : [],
        useData:[],
        insertMessageData:[],
        select1Value:[],
        select2Value:[],
        inputData :[],
    };

    changeInput=(value,option)=>{
        /*let data=this.props.insertData;
        data[option]=value;
        this.props.dispatchData(data);*/
        alert("value："+value + "  Option :" + option);
    };
    getReturn=()=>{

       /* this.props.onRef*/

    };

    getData = ()=>{
        let params = {
        };
        //为发送信息提供名单（项目，小组，人员）
        fetchPost(global.constants.sendMessageHelp,params)
            .then(
                (res)=>this.setData(res)
            )
            .finally()
    };
    setData=(list)=>{
        console.log(list);
        this.setState({
            data:list
        })
    };
    componentDidMount() {
        this.props.onRef(this);
        this.getData();
    }
    changeSelectOption=(optionValue)=>{
        if(optionValue==='0'){
            this.setState({
                useData: this.state.data.user.map(item=>{
                    return {
                        id : item.id,
                        name : item.userName,
                    }
                })
            })
        }else if(optionValue==='1'){
            this.setState({
                useData: this.state.data.group.map(item=>{
                    return {
                        id : item.id,
                        name : item.groupName,
                    }
                })
            })
        }else if(optionValue==='2'){
            this.setState({
                useData: this.state.data.technology.map(item=>{
                    return {
                        id : item.id,
                        name : item.projectName,
                    }
                })
            })
        }
        this.setState({
            select1Value: optionValue
        })
    };
    getSelectContent =(value)=>{
        this.setState({
            insertMessageData : {
                receiver : value,
                operator : 2,
            },
            select2Value: value
        });

    };
    render() {
       
        return(
            <div>
                <Row style={{marginTop:10}}>
                    <Col span={3} style={{lineHeight:'32px'}}>发送类型<span style={{color:'#FF3300'}}>*</span></Col>
                    <Col>
                        <Select style={{width:200}}

                                onChange={(value)=>this.changeSelectOption(value)}>
                            <Option value={'0'}>个人</Option>
                            <Option value={'1'}>小组</Option>
                            <Option value={'2'}>项目组</Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={3} style={{lineHeight:'32px'}}>接收者</Col>
                    <Col>
                        <Select style={{width:200}}
                                onChange={(value)=>this.getSelectContent(value)}>
                           {this.state.useData.map((item)=><Option key={item.id} value={item.id}> {item.name}</Option>)}
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={3} style={{lineHeight:'73px'}}>内容<span style={{color:'#FF3300'}}>*</span></Col>
                    <Col span={20}><TextArea
                        style={{height:73}}
                        /*onChange={(e)=>this.changeInput(e.target.value,'content')}*/
                        onBlur={(dom)=>this.setState({
                            inputData: dom.target.value
                        })}
                    /></Col>
                </Row>

            </div>
        )

    }
}
export default MessageInsert;