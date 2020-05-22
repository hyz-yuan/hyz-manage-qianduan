import React, {Component } from 'react';
import {
    Input,
} from 'antd';


export  default class UpdateForm extends Component{

    handleValue=(e)=>{
        this.props.rtWorkPlace(e.target.value)
    };
    render() {
        return (
            <div style={{height:'100px'}}>
                &nbsp;<label htmlFor='insertAdress'>地址:</label>
                <div style={{height:'7px'}}>
                </div>
                <Input
                    id='insertAdress'
                    onChange={this.handleValue}
                    placeholder='请输入新地址'
                />
            </div>
        )
    }
}