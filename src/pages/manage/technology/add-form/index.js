import React, {Component } from 'react';
import {
    Input,
    Select
} from 'antd';
import {fetchPost} from "../../../../utils/fetch";

const { Option } = Select;
export  default class AddForm extends Component{
    state={
        selectOption: null,
    };
    componentDidMount() {
        this.loadData();
    }

    /*
    * 获取数据
    * */
    loadData(){
        let params={};
        this.requestProgress(global.constants.technologySelectP,params);
    };
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
    /*
    * 转换数据格式
    * */
    setData = (list) => {
        let pname ={};

        pname=list.map((item, index) =><Option key={item.id}>{item.technologyName}</Option>);
        this.setState({
            selectOption: pname,
        })
        //message.info("保存成功！")
    };
    handleValue=(e)=>{
        this.props.rtNewTechnology(e.target.value);
    };
    handleChange=(key)=> {
        this.props.rtNewPid(key);
    };
    render() {
        const {selectOption} = this.state;
        return (
            <div style={{height:'140px'}}>
                &nbsp;<label>上级名称</label>
                <div style={{height:'7px'}}>
                </div>
                <div>
                    <Select
                        defaultValue='第一级'
                        key={0}
                        style={{ width: 120 }}

                        onSelect={this.handleChange}
                    >
                        <Option value='0'>第一级</Option>
                        {selectOption}
                    </Select>
                </div>
                &nbsp;<label htmlFor='insertAdress'>技术名称</label>
                <div style={{height:'7px'}}>
                </div>
                <Input
                    id='insertAdress'
                    onChange={this.handleValue}
                    placeholder='请输入新的技术名称'
                />
            </div>
        )
    }
}