import {message} from 'antd';
import {createHashHistory} from "history";

export function fetchPost(url, params) {

    return new Promise((resolve, reject) => fetch(url, {
            method: 'POST',
            // mode:'no-cors',
            body: JSON.stringify(params),
            credentials: 'include',
            headers: new Headers({
                "Content-Type": "application/json"

            })
        }).

        then(checkStatus)
            .then(response => response.json())
            .then((data)=> {

                if (data.code === 0) {
                    resolve(data.data)
                }
                else {
                    reject(data.data.msg )
                    message.info(data.data.msg)
                }
            })
    )
}


function checkStatus(response) {
    if (response.status == 1002) {
        message.info('重新登陆');
        createHashHistory().push('/')
        return Promise.reject();
    } else {
        return response
    }
}