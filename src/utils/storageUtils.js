/*
* 进行数据存储的工具化模块
* */
const USER_KEY = 'user_key'
export default {
    /*
    * 保存user
    * */
    saveUser (user) {
        sessionStorage.setItem(USER_KEY,JSON.stringify(user));
    },
    /*
    * 读取
    * */
    getUser (){
        return JSON.parse(sessionStorage.getItem(USER_KEY)|| '{}');
    },
    /*
    * 删除
    * */
    removeUser(){
        sessionStorage.removeItem(USER_KEY);
    }
}