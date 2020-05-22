import React, {Component } from 'react';
import {
    Input,
} from 'antd';


export  default class AddForm extends Component{

    state={
        oldWorkPlace:'',
    };
    componentDidMount() {
        this.setState({
            oldWorkPlace: this.props.workPlace,
        })
    }
    handleValue=(e)=>{
        this.props.rtWorkPlace(e.target.value)
    };


    render() {
        const {oldWorkPlace}=this.state||[];
        return (
            <div style={{height:'100px'}}>
                &nbsp;<label htmlFor='insertAdress'>地址:</label>
                <div style={{height:'7px'}}>
                </div>
                <Input
                    id='insertAdress'
                    onChange={this.handleValue}
                    defaultValue={oldWorkPlace}
                    placeholder={oldWorkPlace}
                />
            </div>
        )
    }
}
