import React,{Component} from "react";
import {Button, message} from "antd";
import mememoryUtils from "../../utils/mememoryUtils";


/*
* 后台管理的路由组件
* */
export default class Admin  extends Component{

    render() {
        const user  = mememoryUtils.user;
        const success = () => {
            message.success('This is a success message');
        };

        const error = () => {
            message.error('This is an error message');
        };

        const warning = () => {
            message.warning('This is a warning message');
        };
        return (
            <div>
                <Button onClick={success}>Success</Button>
                <Button onClick={error}>Error</Button>
                <Button onClick={warning}>Warning</Button>
            </div>
        )
    }

}